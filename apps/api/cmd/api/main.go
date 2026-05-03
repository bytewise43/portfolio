// Package main is the entry point for the API application. It initializes and runs the application using Uber's Fx framework.
package main

import (
	"go.uber.org/fx"

	"github.com/bytewise43/portfolio/apps/api/internal/app"
)

//go:generate go tool sqlc generate -f ../../sqlc.yml

func main() {
	fx.New(app.Module).Run()
}
