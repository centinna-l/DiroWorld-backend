// MARK: Database imports here.

const { createPrompt, fetchById, updatePromptByID } = require("./llm");

module.exports = {
  // add all your database here
  createPrompt,
  fetchById,
  updatePromptByID,
};
