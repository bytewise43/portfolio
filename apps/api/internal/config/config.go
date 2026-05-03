package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

// Config holds the top-level application configuration.
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
}

// ServerConfig holds HTTP server settings.
type ServerConfig struct {
	Port int `yaml:"port"`
}

// DatabaseConfig holds database connection and pool settings.
// URI takes precedence when set — ideal for CNPG-mounted secrets (file:///secrets/db/uri).
// Individual fields are used when URI is empty.
type DatabaseConfig struct {
	URI             Secret   `yaml:"uri"`
	Host            string   `yaml:"host"`
	Port            int      `yaml:"port"`
	User            string   `yaml:"user"`
	Password        Secret   `yaml:"password"`
	Name            string   `yaml:"name"`
	SSLMode         string   `yaml:"sslmode"`
	MaxConns        int32    `yaml:"max_conns"`
	MinConns        int32    `yaml:"min_conns"`
	MaxConnLifetime Duration `yaml:"max_conn_lifetime"`
	MaxConnIdleTime Duration `yaml:"max_conn_idle_time"`
}

// DSN returns the connection string, preferring URI when set.
func (d DatabaseConfig) DSN() string {
	if v := d.URI.Value(); v != "" {
		return v
	}

	return fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=%s",
		d.User, d.Password.Value(), d.Host, d.Port, d.Name, d.SSLMode,
	)
}

// Secret holds a sensitive string that can be sourced from a literal value or a file path
// prefixed with "file://" (e.g. Vault/OpenBao agent or Kubernetes mounted secrets).
// File content has trailing newlines stripped automatically.
type Secret struct{ value string }

// Value returns the secret's value.
func (s Secret) Value() string { return s.value }

// UnmarshalYAML implements custom YAML unmarshaling for Secret, supporting "file://" prefix to read from files.
func (s *Secret) UnmarshalYAML(node *yaml.Node) error {
	if path, ok := strings.CutPrefix(node.Value, "file://"); ok {
		data, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		s.value = strings.TrimRight(string(data), "\r\n")

		return nil
	}

	s.value = node.Value

	return nil
}

// set assigns a new value to the secret.
func (s *Secret) set(v string) { s.value = v }

// Duration wraps time.Duration to support YAML strings like "5m" or "1h30m".
type Duration struct{ time.Duration }

// UnmarshalYAML implements custom YAML unmarshaling for Duration, parsing duration strings.
func (d *Duration) UnmarshalYAML(node *yaml.Node) error {
	dur, err := time.ParseDuration(node.Value)
	if err != nil {
		return err
	}

	d.Duration = dur

	return nil
}

// NewConfig loads configuration from a YAML file and applies environment variable overrides.
// The config file path defaults to "configs/config.yaml" and can be overridden via CONFIG_FILE.
func NewConfig() (*Config, error) {
	cfg := defaultConfig()

	path := os.Getenv("CONFIG_FILE")
	if path == "" {
		path = "configs/config.yaml"
	}

	data, err := os.ReadFile(path)
	if err != nil && !os.IsNotExist(err) {
		return nil, err
	}

	if err == nil {
		if err = yaml.Unmarshal(data, cfg); err != nil {
			return nil, err
		}
	}

	applyEnvOverrides(cfg)

	return cfg, nil
}

func defaultConfig() *Config {
	return &Config{
		Server: ServerConfig{
			Port: 8080,
		},
		Database: DatabaseConfig{
			Host:            "localhost",
			Port:            5432,
			User:            "postgres",
			Name:            "portfolio",
			SSLMode:         "disable",
			MaxConns:        25,
			MinConns:        5,
			MaxConnLifetime: Duration{time.Hour},
			MaxConnIdleTime: Duration{30 * time.Minute},
		},
	}
}

func applyEnvOverrides(cfg *Config) {
	if v := os.Getenv("PORT"); v != "" {
		if port, err := strconv.Atoi(v); err == nil {
			cfg.Server.Port = port
		}
	}

	if v := os.Getenv("DB_URI"); v != "" {
		cfg.Database.URI.set(v)
	}

	if v := os.Getenv("DB_HOST"); v != "" {
		cfg.Database.Host = v
	}

	if v := os.Getenv("DB_PORT"); v != "" {
		if port, err := strconv.Atoi(v); err == nil {
			cfg.Database.Port = port
		}
	}

	if v := os.Getenv("DB_USER"); v != "" {
		cfg.Database.User = v
	}

	if v := os.Getenv("DB_PASSWORD"); v != "" {
		cfg.Database.Password.set(v)
	}

	if v := os.Getenv("DB_NAME"); v != "" {
		cfg.Database.Name = v
	}

	if v := os.Getenv("DB_SSLMODE"); v != "" {
		cfg.Database.SSLMode = v
	}

	if v := os.Getenv("DB_MAX_CONNS"); v != "" {
		if n, err := strconv.ParseInt(v, 10, 32); err == nil {
			cfg.Database.MaxConns = int32(n)
		}
	}

	if v := os.Getenv("DB_MIN_CONNS"); v != "" {
		if n, err := strconv.ParseInt(v, 10, 32); err == nil {
			cfg.Database.MinConns = int32(n)
		}
	}

	if v := os.Getenv("DB_MAX_CONN_LIFETIME"); v != "" {
		if d, err := time.ParseDuration(v); err == nil {
			cfg.Database.MaxConnLifetime = Duration{d}
		}
	}

	if v := os.Getenv("DB_MAX_CONN_IDLE_TIME"); v != "" {
		if d, err := time.ParseDuration(v); err == nil {
			cfg.Database.MaxConnIdleTime = Duration{d}
		}
	}
}
