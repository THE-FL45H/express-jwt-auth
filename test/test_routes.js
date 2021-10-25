const request = require("supertest");
const assert = require("assert");
const app = require("../server");
// const sinon = require("sinon");

describe("POST /token", function () {
    it("responds with 400(bad request) if username is not passed", async function () {
        try {
            const response = await request(app)
                .post("/token")
                .expect(400)
                .send({ password: "flash123" })
            assert(response.status, 400);
        } catch (err) {
            throw err;
        }
    })

    it("responds with 400(bad request) if password is not passed", async function () {
        try {
            const response = await request(app)
                .post("/token")
                .expect(400)
                .send({ username: "flash" })
            assert(response.status, 400);
        } catch (err) {
            throw err;
        }
    })

    it("responds with 401(unauthorized) if username and password is incorrect", async function () {
        try {
            const response = await request(app)
                .post("/token")
                .expect(401)
                .send({ username: "Test", password: "wrong password" })
            assert(response.status, 401);
        } catch (err) {
            throw err;
        }
    });

    it("responds with 200(success) if username and password is correct", (done) => {
        try {
            request(app)
                .post("/token")
                .expect(200)
                .send({ username: "flash", password: "flash123" })
                .end((err, res) => {
                    if (err) return done(err);
                    assert(res.status, 200);
                    return done();
                });

            return done();
        } catch (err) {
            throw err;
        }
    })
})