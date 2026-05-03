package database

import "go.uber.org/fx"

// Module is the fx module for the database package, providing the database connection and query utilities.
var Module = fx.Module("database",
	fx.Provide(
		NewDB,
		NewQueries,
	),
)
