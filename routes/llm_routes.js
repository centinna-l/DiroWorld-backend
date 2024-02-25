const express = require("express");
const {
  generateID,
  generateIDTest,
  fetchPromptController,
} = require("../controllers");

const router = express.Router();

router.post("/generate", generateID);
router.post("/test-generate", generateIDTest);
router.post("/", fetchPromptController);

module.exports = router;
