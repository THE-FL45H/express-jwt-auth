const extractPayload = require("../utils/extractPayload");
const { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } = require("../status_codes");
const TokenGenerator = require("../utils/tokenGenerator");

const refreshToken = (config) => {
    const { userStrategy } = config;
    const { identifier, payloadFields } = userStrategy;
    const fields = [identifier, ...payloadFields];

    return async (req, res) => {
        const { refresh } = req.body;
        if (!refresh) {
            return res.status(HTTP_BAD_REQUEST).json({
                details: "Missing refresh token"
            });
        }
        console.log("Key:", config.signingKey);
        const payloadFromJWT = TokenGenerator.verify(refresh, config.signingKey, "refresh");
        if (!payloadFromJWT) {
            return res.status(HTTP_UNAUTHORIZED).json({
                details: "Incorrect credentials"
            });
        }
        const payload = extractPayload(payloadFromJWT, fields);
        const tokenGenerator = new TokenGenerator(payload);
        const accessToken = tokenGenerator.createAccessToken(config);
        const refreshToken = tokenGenerator.createRefreshToken(config);

        const user = await userStrategy.getUserByIdentifier(payload[identifier]);
        if(!user) {
            return res.status(HTTP_UNAUTHORIZED).json({
                details: "Incorrect credentials"
            });
        }

        let response = {
            "access": accessToken,
        }
        if (config.rotateRefresh) {
            response = {
                ...response,
                "refresh": refreshToken,
            };
        }
        if (userStrategy.responseExtras) {
            const extras = await userStrategy.responseExtras(user[identifier]);
            response = { ...response, ...extras }
        }
        return res.json(response);
    }
}

module.exports = refreshToken;