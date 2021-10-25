const defaultConfig = {
    algorithm: "HS256",
    signingKey: process.env.SIGNING_KEY,
    refreshTokenLifetime: "",
    accessTokenLifetime: "",
    rotateRefresh: true
}

module.exports = defaultConfig;