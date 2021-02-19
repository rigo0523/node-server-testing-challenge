const { expectCt } = require("helmet");
const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

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
    const response = await supertest(server).get("/api/users");
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(4);
    expect(response.body[0].username).toBe("Superman");
  });
});
