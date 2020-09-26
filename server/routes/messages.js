const express = require("express");
const router = express.Router();
const msgController = require("../controllers/messages");

router.get("/getAllMessages", msgController.getAllMessages);

router.get("/getUserMessages/:name", msgController.getUserMessages);

router.post("/postMessage", msgController.postMsg);

module.exports = router;
