const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

//------------CREATE A TEST.DB3 FILE--------------------//
// knex seed:run --env=testing
// knex migrate:latest --env=testing

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

//BEFORE EACH run the seeds before every single test
//so each test havea fresh start with the database
beforeEach(async () => {
  await db.seed.run();
  //OR
  // await db("users").truncate();
});

//--detectOpenHandles leaks, use afterAll function
//close database connection before it ends
//FUNCTION AFTER ALL OF OUR TEST HAVE RAN
// DOESN'T MATTER WHERE IT'S PLACED, IT'S ALWAYS HOISTED ON TOP
afterAll(async () => {
  //this is a JEST hook that will run after all the test in this file have ran
  //closethe database connection before the test runner ends,
  //to prevent any warnings about leaks
  await db.destroy();
});

describe("users integrations test", () => {
  it("GET list of users /api/users", async () => {
    const res = await supertest(server).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBeGreaterThanOrEqual(3); //or to have length of the array, 3 objects in array, etc. .toHaveLenght(3)
    expect(res.body[0].name).toBe("Superman");
  });

  it("gets a single user by ID", async () => {
    const res = await supertest(server).get("/api/users/1");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Superman");
  });

  it("returns an error for a user that doesn't exist", async () => {
    const res = await supertest(server).get("/api/users/100");

    expect(res.statusCode).toBe(401);
  });

  it("creates a new user", async () => {
    const newUser = { name: "test", location: "testing" };
    const res = await supertest(server).post("/api/users").send(newUser);
    console.log(res);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("test");
    // expect(res.body.id).toBeDefined(); //we don't know what it's going to be, just make sure
    //something gets generated
  });
});
