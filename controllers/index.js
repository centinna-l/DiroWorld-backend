// MARK: Conroller imports here.

const { testController } = require("./auth_controller");
const {
  generateID,
  generateIDTest,
  fetchPromptController,
  textMeController,
  dummyController,
  quitController,
} = require("./llm_controller");

module.exports = {
  // add all your controllers here.
  testController,
  generateID,
  generateIDTest,
  fetchPromptController,
  textMeController,
  dummyController,
  quitController,
};
