const express = require("express");
const router = express.Router();
const Users = require("./users-model");

//GET /api/users
router.get("/", (req, res, next) => {
  Users.getUsers()
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: `no users found` });
    })
    .catch((err) => next(err));
});

//GET /api/users/:id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.getUserById(id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(401).json({ message: `no user by ID ${id} found` });
    })
    .catch((err) => next(err));
});

//DELETE /api/users/:id --> delete the user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.deleteUser(id)
    .then((user) => {
      res.status(204).json(user);
    })
    .catch((err) => next(err));
});

//POST /api/users/ ---> post a new user
router.post("/", (req, res, next) => {
  const user = req.body;

  Users.addUser(user)
    .then((newUser) => {
      newUser
        ? res.status(201).json(user)
        : res.status(404).json({ cant_post_user: "Can not post the user" });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
