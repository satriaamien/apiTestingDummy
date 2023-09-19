// # TUGAS 6
// - buat project baru
// - test semua API yang ada di https://dummyjson.com/docs/todos
// - pasang report portal ke projek kalian
// - validasi semua api menggunakan json schema, dan usahakan tidak mengulang pembuatan json schema
// - untuk api yang jenisnya POST dan PUT/PATCH, silahkan validasi responsenya mirip dengan data yang dikirim saat request

//tidak dipake ini
// const expect = require("chai").expect;

const alltodoschema = require("./typeTesting/typeSchema");
const todositemschema = require("./typeTesting/typeSchemaItem");
const req = require("supertest")("https://dummyjson.com");
const chaiJsonSchema = require("chai-json-schema");
const chai = require("chai");
//register
chai.use(chaiJsonSchema);
const expect = chai.expect;

describe("Get all todos ", async () => {
  describe("Get all API", async () => {
    it("get body page list", async () => {
      const res = await req.get("/todos");
      //   console.log(res.body);
      expect(res.body).jsonSchema(alltodoschema);
    });
  });
  describe("Get a single todo", async () => {
    it("get single", async () => {
      const res = await req.get("/todos/1");
      expect(res.body).have.jsonSchema(todositemschema);
    });
  });
  describe("Get a random todo", async () => {
    it("Get a random", async () => {
      const res = await req.get("/todos/random");
      //   console.log(res.body);
      expect(res.body).have.jsonSchema(todositemschema);
    });
  });
  describe("Limit and skip todos", async () => {
    it("Limit and skip", async () => {
      const res = await req.get("/todos?limit=3&skip=10");
      //   console.log(res.body);
      expect(res.body).have.jsonSchema(alltodoschema);
    });
  });
  describe("Get all todos by user id", () => {
    it("Get all data by user id", async () => {
      const res = await req.get("/todos/user/5");
      //   console.log(res.body);
      expect(res.body).have.jsonSchema(alltodoschema);
    });
  });
  describe("Add a new todo", async () => {
    it("Add data", async () => {
      const todoSchema = {
        type: "object",
        properties: {
          todo: { type: "string" },
          completed: { type: "boolean" },
          userId: { type: "number" },
        },
      };

      const payload = {
        todo: "Use DummyJSON dfgew",
        completed: false,
        userId: 5,
      };
      const res = await req.post("/todos/add").send(payload);
      //   console.log(res.body);
      expect(res.body).jsonSchema(todositemschema);
      expect(res.body.completed).equal(payload.completed);
    });
  });
  describe("Update a todo", async () => {
    it("Update a data", async () => {
      const payload = {
        todo: "asek asek jos",
        completed: false,
        userId: 5,
      };
      const res = await req.put("/todos/1").send(payload);
      //   console.log(res.body);
      expect(res.body).jsonSchema(todositemschema);
      expect(res.body.todo).equal(payload.todo);
    });
  });
  describe("Delete a todo", async () => {
    it("Delete data", async () => {
      const res = await req.delete("/todos/1");
      //   console.log(res.body);
      expect(res.body).jsonSchema(todoSchema);
    });
  });
});
