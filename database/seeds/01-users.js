exports.seed = function (knex) {
  //truncated through knex cleaner already
  return knex("users").insert([
    { id: 1, username: "Superman", location: "Krypton" },
    { id: 2, username: "Thor", location: "Asgard" },
    { id: 3, username: "Hulk", location: "Earth" },
  ]);
};
