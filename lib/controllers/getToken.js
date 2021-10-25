const { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } = require("../status_codes");
const TokenGenerator = require("../tokenGenerator");

const getToken = (config) => {
    // const { userStrategy: { identifier }, } = config;
    const userStrategy = config.userStrategy;
    const { identifier } = userStrategy;

    return async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(HTTP_BAD_REQUEST).json({
                "details": "username/email & password is required"
            })
        }
        const user = await userStrategy.getUser(username, password);
        if (!user) {
            return res.status(HTTP_UNAUTHORIZED).json({
                "details": "Incorrect username/password"
            });
        }
        console.log("User: ", user);
        const tokenGenerator = new TokenGenerator({ identifier })
        const accessToken = tokenGenerator.createAccessToken(config);
        const refreshToken = tokenGenerator.createRefreshToken(config);
        res.json({
            "access": accessToken,
            "refresh": refreshToken
        });
    }
}

module.exports = getToken;