const refreshToken = (config) => {
    return (req, res) => {
        res.json({
            "access": "Access token",
            "refresh": "Refresh Token"
        });
    }
}

module.exports = refreshToken;