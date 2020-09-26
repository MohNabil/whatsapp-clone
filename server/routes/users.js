const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/users", usersController.getUsers);

router.post("/postUser", usersController.postUser);

router.post("/login", usersController.loginUser);

router.post("/addMsg", usersController.addMessageToUser);

module.exports = router;
