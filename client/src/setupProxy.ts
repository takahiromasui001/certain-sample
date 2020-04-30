import proxy from 'http-proxy-middleware'

module.exports = function(app: any) {
    const headers  = {
        "Content-Type": "application/json",
    }
    app.use(proxy("/api/v1/", { target: "https://test.com/",changeOrigin: true,secure: false,headers: headers}));  
}
