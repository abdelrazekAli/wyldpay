const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Proxy all requests that start with /api to backend
    createProxyMiddleware({
      target: "http://localhost:8000", // Backend URL
      changeOrigin: true, // Set true to avoid host header issues
      onError(err, req, res) {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong while proxying the request.');
      },
    })
  );
};