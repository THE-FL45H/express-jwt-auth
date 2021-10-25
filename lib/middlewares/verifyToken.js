const { HTTP_UNAUTHORIZED } = require("../status_codes");
const TokenGenerator = require("../utils/tokenGenerator");
const GetTokenFromString = require("../utils/GetTokenFromString");

const verifyToken = (config) => {
    const { userStrategy } = config;
    const { identifier } = userStrategy;
    return async (req, res, next) => {
        const accessToken = GetTokenFromString(req.headers.authorization);
        const payload = TokenGenerator.verify(accessToken, config.signingKey, "access");
        console.log("Payload: ", payload);
        if (!payload) {
            return res.status(HTTP_UNAUTHORIZED).json({
                details: "Incorrect credentials"
            });
        }
        const user = await userStrategy.getUserByIdentifier(payload[identifier]);
        if (!user) {
            return res.status(HTTP_UNAUTHORIZED).json({
                details: "Incorrect credentials"
            });
        }
        req.user = user
        return next();
    }
}

module.exports = verifyToken;