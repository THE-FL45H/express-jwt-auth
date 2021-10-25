const defaultConfig = {
    algorithm: "HS256",
    signingKey: process.env.SIGNING_KEY,
    refreshTokenLifetime: "",
    accessTokenLifetime: "",
    rotateRefresh: true
}

module.exports = function (config) {
    config = {
        ...defaultConfig,
        config,
    }
    return {
        tokenRoute: (req, res) => {
            res.json({
                "access": "Access token",
                "refresh": "Refresh Token"
            });

        },
        refreshTokenRoute: (req, res) => {
            res.json({
                "access": "Access token",
                "refresh": "Refresh Token"
            });
        },
        VerifyToken: (req, res, next) => {
            next();
        }
    }
}