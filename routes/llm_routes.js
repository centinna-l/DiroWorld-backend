const express = require("express");
const { generateID, generateIDTest } = require("../controllers");

const router = express.Router();

router.post("/generate", generateID);
router.post("/test-generate", generateIDTest);

module.exports = router;
