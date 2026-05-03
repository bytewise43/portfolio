package config

import "go.uber.org/fx"

// Module is the fx module for the config package, providing the application configuration and its dependencies.
var Module = fx.Module("config",
	fx.Provide(NewConfig),
)
