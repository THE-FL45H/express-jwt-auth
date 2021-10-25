const jwt = require("jsonwebtoken");
const defaultConfig = require("./config");

class TokenGenerator {
    /*
    Class to generate tokens
    */

    constructor(payload) {
        this.payload = payload;
    }

    static verify(token, type = "access") {
        jwt.verify(token, "", (err, decoded) => {

        });
    }

    static _generateToken(payload, config) {
        // console.log(config);
        const token = jwt.sign(payload, config.signingKey, {
            algorithm: config.algorithm,
            expiresIn: config.expiresIn
        });
        return token;
    }

    createAccessToken(config) {
        const token = TokenGenerator._generateToken(
            { ...this.payload, type: "access" },
            {
                signingKey: config.signingKey,
                algorithm: config.algorithm,
                expiresIn: config.accessTokenLifetime,
            },
        );
        return token;
    }

    createRefreshToken(config) {
        const token = TokenGenerator._generateToken(
            { ...this.payload, type: "refresh" },
            {
                signingKey: config.signingKey,
                algorithm: config.algorithm,
                expiresIn: config.refreshTokenLifetime,
            },
        );
        return token;
    }
}

module.exports = TokenGenerator;