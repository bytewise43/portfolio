package database

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/fx"

	"github.com/bytewise43/portfolio/apps/api/internal/config"
)

// NewDB initializes a pgxpool connection pool from config and registers lifecycle hooks.
func NewDB(lc fx.Lifecycle, cfg *config.Config) (*pgxpool.Pool, error) {
	poolCfg, err := pgxpool.ParseConfig(cfg.Database.DSN())
	if err != nil {
		return nil, err
	}

	poolCfg.MaxConns = cfg.Database.MaxConns
	poolCfg.MinConns = cfg.Database.MinConns
	poolCfg.MaxConnLifetime = cfg.Database.MaxConnLifetime.Duration
	poolCfg.MaxConnIdleTime = cfg.Database.MaxConnIdleTime.Duration

	db, err := pgxpool.NewWithConfig(context.Background(), poolCfg)
	if err != nil {
		return nil, err
	}

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			return db.Ping(ctx)
		},
		OnStop: func(_ context.Context) error {
			db.Close()
			return nil
		},
	})

	return db, nil
}

// NewQueries creates a new Queries instance backed by the connection pool.
func NewQueries(db *pgxpool.Pool) *Queries {
	return New(db)
}
