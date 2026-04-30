// Package main is the main entry point of the app
package main

import "fmt"

//go:generate go tool sqlc generate -f ../../sqlc.yml

func main() {
	fmt.Println("Hello, World!")
}
