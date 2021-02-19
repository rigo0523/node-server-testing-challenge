exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 128).notNull().unique();
    tbl.string("location", 128).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
