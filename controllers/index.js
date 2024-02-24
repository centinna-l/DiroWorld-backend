// MARK: Conroller imports here.

const { testController } = require("./auth_controller");
const { generateID, generateIDTest } = require("./llm_controller");

module.exports = {
  // add all your controllers here.
  testController,
  generateID,
  generateIDTest,
};
