const express = require("express");
const { testController } = require("../controllers");

const router = express.Router();

router.get("/auth/test", testController);

module.exports = router;
