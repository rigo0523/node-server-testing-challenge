const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
};

//-----------------------USER_C.R..D----------------------//

//GET /api/users
function getUsers() {
  return db("users").orderBy("id");
}

//GET -- /api/users/:id ---> get user by ID
function getUserById(id) {
  return db("users").where({ id: id }).first();
}

//DELETE -- /api/users/:id ---> remove the user
function deleteUser(id) {
  return db("users")
    .where({ id })
    .first()
    .then((ids) => {
      return db("users").where({ id }).del();
    });
}

//POST --  /api/auth/register ---> post a new user
function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      console.log("ids--->", ids);
      return db("users").where({ id: ids }).first();
    });
}
