require("dotenv").config();
const express = require("express");
const jwtAuth = require("./lib");
const { User } = require("./models");

const { verifyToken, getToken, refreshToken } = jwtAuth({
    userStrategy: {
        identifier: "id",
        payloadFields: ["username", "firstName", "lastName"],
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
        },
        // responseExtras: async function(id) {
        //     const user = await this.getUserByIdentifier(id);
        //     return { email: user.email };
        // }
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

app.get("/protected", verifyToken, (req, res) => {
    res.send("This is protected by express-jwt-auth");
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})