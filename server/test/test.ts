import { Response } from "express";

var chaiInstance = require("chai");
var chaiHttp = require("chai-http");

const expect = chaiInstance.expect;
const should = chaiInstance.should();

var server = require("../index");

chaiInstance.use(chaiHttp);

describe("/First Test Collection", () => {
  it("test default API welcome route...", (done) => {
    chaiInstance
      .request(server)
      .get("/")
      .end((err: Error, res: any) => {
        res.should.have.status(200);
        expect(res.body).to.be.equal("bean-there");

        done();
      });
  });

  it("should test two values...", () => {
    let expected = 10;
    let actual = 10;

    expect(actual).to.be.equal(expected);
  });
});
