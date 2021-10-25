const extractPayload = require("../utils/extractPayload");
const { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } = require("../status_codes");
const TokenGenerator = require("../utils/tokenGenerator");

const getToken = (config) => {
    // const { userStrategy: { identifier }, } = config;
    const userStrategy = config.userStrategy;
    const { identifier, payloadFields } = userStrategy;

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
        const payload = extractPayload(user, [ identifier, ...payloadFields]);
        const tokenGenerator = new TokenGenerator(payload);
        const accessToken = tokenGenerator.createAccessToken(config);
        const refreshToken = tokenGenerator.createRefreshToken(config);
        let response = {
            "access": accessToken,
            "refresh": refreshToken
        }
        if(userStrategy.responseExtras) {
            const extras = await userStrategy.responseExtras(user[identifier]);
            response = {...response, ...extras}
        }
        return res.json(response);
    }
}

module.exports = getToken;