const defaultConfig = {
    algorithm: "HS256",
    signingKey: process.env.SECRET_KEY,
    refreshTokenLifetime: "1209600s",
    accessTokenLifetime: "300s",
    rotateRefresh: true
}

module.exports = defaultConfig;