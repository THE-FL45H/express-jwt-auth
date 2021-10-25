const getToken = require("./controllers/getToken");
const refreshToken = require("./controllers/refreshToken");
const VerifyToken = require("./VerifyToken");
const defaultConfig = require("./config");

module.exports = function (config) {
    config = {
        ...defaultConfig,
        ...config,
    }
    return {
        getToken: getToken(config),
        refreshToken: refreshToken(config),
        VerifyToken
    }
}