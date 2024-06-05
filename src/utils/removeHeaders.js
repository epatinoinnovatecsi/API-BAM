const removeHeaders = (req, res, next) => {
    res.removeHeader("CF-Ray");
    res.removeHeader("CF-Cache-Status");
    res.removeHeader("Access-Control-Allow-Origin");
    res.removeHeader("Strict-Transport-Security");
    res.removeHeader("content-security-policy");
    res.removeHeader("Cross-Origin-Opener-Policy");
    res.removeHeader("Origin-Agent-Cluster");
    res.removeHeader("Referrer-Policy");
    res.removeHeader("X-Content-Type-Options");
    res.removeHeader("X-DNS-Prefetch-Control");
    res.removeHeader("X-Download-Options");
    res.removeHeader("X-Permitted-Cross-Domain-Policies");
    res.removeHeader("X-XSS-Protection");
    res.removeHeader("X-Frame-Options");
    res.removeHeader("ETag");
    next();
}

module.exports = removeHeaders