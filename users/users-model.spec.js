const Users = require("./users-model");
const db = require("../database/dbConfig");

//------------CREATE A TEST.DB3 FILE--------------------//
// knex seed:run --env=testing
// knex migrate:latest --env=testing
// npm i @types/jest

//make call to migrate api inside knex
//make sure it's a clean DB
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

//BEFORE EACH run the seeds before every single test
//so each test havea fresh start with the database
beforeEach(async () => {
  await db.seed.run(); // clean connection pool
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

describe("test users model", () => {
  describe("Add user", () => {
    it("insers the user", async () => {
      await Users.addUser({ name: "hulk", location: "earth" });

      const users = await db("users");
      console.log(users);
      expect(users).toHaveLength(4);
    });

    it("returns the user inserted", async () => {
      let user = await Users.addUser({ name: "yo", location: "mercury" });
      console.log("user--->", user);
      expect(user.name).toBe("yo");
    });
  });
});
