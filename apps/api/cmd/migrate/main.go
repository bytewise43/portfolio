// Package main serves as the entry point for the migration tool which will be used to run migrations on the database.
package main

import (
	"github.com/golang-migrate/migrate/v4"

	_ "github.com/golang-migrate/migrate/v4/database/pgx/v5" // Database driver import
	_ "github.com/golang-migrate/migrate/v4/source/file"     // Source driver import
)

func main() {
	m, err := migrate.New(
		"file://sql/migrations",
		"pgx5://postgres:password@localhost:5432/portfolio?sslmode=disable",
	)
	if err != nil {
		panic(err)
	}

	err = m.Up()

	if err != nil {
		panic(err)
	}
}
