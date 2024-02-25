const { llm } = require("../helpers");
const Prompt = require("../models/prompt");
const mongoose = require("mongoose");

const createPrompt = async (id, name, age, interests) => {
  try {
    console.log("Inside create prompt");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: false, error: "Id is invalid", data: null };
    }
    const message = await llm(
      `Start a never ending story about ${name} a ${age} year old interested in ${interests}. In every answer, it should give me a short story start with 3 options of what to do next, based on the user choice keep the story going with 3 options at the end always`
    );
    console.log(message);
    let prompt = new Prompt({
      prompt_id: id,
      data: `${message.message}`,
    });
    let result = await prompt.save();
    console.log(result);
    if (!result) {
      return { status: false, error: "Not able to create prompt", data: null };
    }
    return { status: true, error: null, data: result };
  } catch (error) {
    return { status: false, error: error.message, data: null };
  }
};

const fetchById = async (id) => {
  try {
    let prompt = await Prompt.findOne({ prompt_id: id });
    if (!prompt) {
      return {
        status: false,
        error: "Prompt not Found, try playing the game again",
        data: null,
      };
    }
    return { status: true, error: null, data: prompt };
  } catch (error) {
    return { status: false, error: error.message, data: null };
  }
};

module.exports = {
  createPrompt,
  fetchById,
};
