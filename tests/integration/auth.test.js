const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

let server;

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });

  let token;
  let name;

  // Standard code for making a POST request
  const exec = async () => {
    return await request(server)
      .post("/api/genres/")
      .set("x-auth-token", token)
      .send({ name });
  }

  // Happy Path
  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "genre1";
  })


  it("should return 401 if no token is provided", async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  })

  it("should return 400 if token is invalid", async () => {
    token = 'a';
    const res = await exec();
    expect(res.status).toBe(400);
  })


});
