"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chaiInstance = require("chai");
var chaiHttp = require("chai-http");
const expect = chaiInstance.expect;
const should = chaiInstance.should();
var server = require("../index");
chaiInstance.use(chaiHttp);
describe("Welcome Routes", () => {
    it("GET /", (done) => {
        chaiInstance
            .request(server)
            .get("/")
            .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).to.be.equal("bean-there");
            done();
        });
    });
});
describe("User Routes", () => {
    it("GET /user/:userId/reviews", (done) => {
        chaiInstance
            .request(server)
            .get("/user/5/reviews")
            .end((err, res) => {
            res.should.have.status(200);
            expect(Array.isArray(res.body.reviews)).to.be.equal(true);
            done();
        });
    });
});
