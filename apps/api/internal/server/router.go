package server

import "github.com/gin-gonic/gin"

// NewRouter creates and configures a new Gin router instance.
func NewRouter() (*gin.Engine, error) {
	gin.SetMode(gin.ReleaseMode)

	engine := gin.New()

	if err := engine.SetTrustedProxies(nil); err != nil {
		return nil, err
	}

	return engine, nil
}
