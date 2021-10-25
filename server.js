const express = require("express");
const jwtAuth = require("./lib");
const { VerifyToken, tokenRoute, refreshTokenRoute } = jwtAuth({
    algorithm: "HS256",
    signingKey: "",
    refreshTokenLifetime: "",
    accessTokenLifeTime: "",
    rotateRefresh: true
});

const PORT = process.env.PORT || 3000;

const app = express();


app.post("/token", tokenRoute);
app.post("/token/refresh", refreshTokenRoute);

app.get("/not-protected", (req, res) => {
    res.send("This is not protected by express-jwt-auth");
})

app.get("/protected", VerifyToken, (req, res) => {
    res.send("This is protected by express-jwt-auth");
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})