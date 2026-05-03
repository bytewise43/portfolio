package server

import (
	"net/http"

	"go.uber.org/fx"
)

// Module is the fx module for the server package, providing the HTTP server and its dependencies.
var Module = fx.Module("server",
	fx.Provide(
		NewRouter,
		NewHTTPServer,
	),
	fx.Invoke(func(*http.Server) {}),
)
