const getTokenFromString = (tokenString) => {
    /**
    @params {
        tokenString: Bearer token
    }
    @return token
    */
    try {
        return tokenString.split(" ")[1].trim();
    } catch(err) {
        return null;
    }
}

module.exports = getTokenFromString;