package server

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/fx"

	"github.com/bytewise43/portfolio/apps/api/internal/config"
)

// NewHTTPServer creates and starts an HTTP server using the provided configuration and router, managing its lifecycle with fx.
func NewHTTPServer(lc fx.Lifecycle, cfg *config.Config, router *gin.Engine) *http.Server {
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Server.Port),
		Handler: router,
	}

	lc.Append(fx.Hook{
		OnStart: func(_ context.Context) error {
			go func() {
				if err := srv.ListenAndServe(); err != nil &&
					!errors.Is(err, http.ErrServerClosed) {
					panic(err)
				}
			}()

			return nil
		},
		OnStop: func(ctx context.Context) error {
			return srv.Shutdown(ctx)
		},
	})

	return srv
}
