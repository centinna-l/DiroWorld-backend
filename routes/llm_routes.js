const express = require("express");
const {
  generateID,
  generateIDTest,
  fetchPromptController,
  textMeController,
  dummyController,
  quitController,
} = require("../controllers");

const router = express.Router();

router.post("/generate", generateID);
router.post("/test-generate", generateIDTest);
router.post("/", fetchPromptController);
router.post("/textme", textMeController);
router.post("/reply", dummyController);
router.get("/quit", quitController);

module.exports = router;
