// Package app provides a central oraganization point for all modules to converge.
package app

import (
	"go.uber.org/fx"

	"github.com/bytewise43/portfolio/apps/api/internal/config"
	"github.com/bytewise43/portfolio/apps/api/internal/database"
	"github.com/bytewise43/portfolio/apps/api/internal/server"
)

// Module is the main application module that includes all other modules.
var Module = fx.Options(
	config.Module,
	database.Module,
	server.Module,
)
