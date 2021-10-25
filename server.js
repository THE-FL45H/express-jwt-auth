require("dotenv").config();
const express = require("express");
const jwtAuth = require("./lib");
const { User } = require("./models");

const { VerifyToken, getToken, refreshToken } = jwtAuth({
    algorithm: "HS256",
    signingKey: "something",
    refreshTokenLifetime: "1209600s",
    accessTokenLifetime: "300s",
    rotateRefresh: true,
    userStrategy: {
        identifier: "id",
        payload: ["username", "firstName", "lastName"],
        getUser: async (username, password) => {
            const user = await User.findOne({
                where: {
                    username, password
                }
            });
            return user;
        },
        getUserByIdentifier: async (id) => {
            const user = await User.findByPk(id);
            return user;
        }
    }
});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());


app.post("/token", getToken);
app.post("/token/refresh", refreshToken);

app.get("/not-protected", (req, res) => {
    res.send("This is not protected by express-jwt-auth");
})

app.get("/protected", VerifyToken, (req, res) => {
    res.send("This is protected by express-jwt-auth");
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})