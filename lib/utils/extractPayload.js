const extractPayload = (user, fields) => {
    const payload = {};
    fields.forEach((key) => {
        payload[key] = user[key];
    });
    return payload;
}

module.exports = extractPayload;