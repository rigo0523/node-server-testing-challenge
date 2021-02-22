exports.seed = function (knex) {
  //truncated through knex cleaner already
  return knex("users").insert([
    { id: 1, name: "Superman", location: "Krypton" },
    { id: 2, name: "Thor", location: "Asgard" },
    { id: 3, name: "Hulk", location: "Earth" },
  ]);
};
