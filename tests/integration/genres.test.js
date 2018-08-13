const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" }
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
      expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
      expect(res.body.some(g => g.name === "genre3")).toBeTruthy();
    });
  });

  describe("GET /:id", async () => {
    it("should return a genre if a valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name); //expect name to have genre.name
    });

    it("should return 404 if an invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/2");
      expect(res.status).toBe(404);
    });
  });
});
