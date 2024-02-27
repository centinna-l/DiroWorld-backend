const { ObjectId } = require("mongodb");
const { createPrompt, fetchById, updatePromptByID } = require("../database");
const { cleanPrompt, llm } = require("../helpers");
const fs = require("fs");
const path = require("path"); // Import the path module

const generateID = async (req, res, next) => {
  try {
    const id = new ObjectId();
    const { name, age, interests } = req.body;

    // let result = await createPrompt(id, name, age, interests);
    // console.log(id, result.error);
    // if (!result.status) {
    //   next(Error(result.message));
    // }
    return res.json({
      id,
      message: "Random message",
      options: [name, age, interests],
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// const generateIDTest = async (req, res, next) => {
//       try {
//         const id = new ObjectId();
//         const { name, age, interests } = req.body;
//         // let result = await createPrompt(id, name, age, interests);
//         // console.log(id, result.error);
//         // if (!result.status) {
//         //   next(Error(result.message));
//         // }
//         return res.json({
//           id,
//           message:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis",
//           options: [name, age, interests],
//         });
//       } catch (error) {
//         return res.json({ error: error.message });
//       }
// }

const generateIDTest = async (req, res, next) => {
  try {
    const id = new ObjectId();
    const { name, age, interests } = req.body;
    let content = `Start a never ending story about ${name} a ${age} year old interested in ${interests}. In every answer, it should give me a short story start with 3 options of what to do next, based on the user choice keep the story going with 3 options at the end always`;
    const filePath = path.join(__dirname, "messages.json");
    console.log("After the data");
    let jsonData = fs.readFileSync(filePath, "utf8");

    let parseData = JSON.parse(jsonData);
    parseData.data.push({
      role: "user",
      content,
    });
    const prompt = await llm(parseData.data);
    console.log(prompt.chatCompletion.choices[0].message);
    parseData.data.push(prompt.chatCompletion.choices[0].message);
    fs.writeFileSync(filePath, JSON.stringify(parseData, null, 2), "utf8");
    // let result = await createPrompt(id, name, age, interests);
    // console.log(id, result.error);
    // if (!result.status) {
    //   next(Error(result.message));
    // }
    let clean_prompt = cleanPrompt(
      prompt.chatCompletion.choices[0].message.content
    );
    return res.json({
      id,
      message: clean_prompt.prompt.join(),
      options: clean_prompt.options,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const fetchPromptController = async (req, res, next) => {
  try {
    const { id } = req.body;
    let prompt = await fetchById(id);
    if (!prompt.status) {
      next(Error(prompt.error));
    }
    let clean_prompt = cleanPrompt(prompt.data.data);
    return res.json({
      id,
      prompt: clean_prompt.prompt.join(),
      options: clean_prompt.options,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const textMeController = async (req, res, next) => {
  try {
    const { id, message } = req.body;
    console.log("Fetch prompt", id, message);
    let fixedText =
      "based on the user choice keep the story going with 3 options at the end always";
    const filePath = path.join(__dirname, "messages.json");
    let jsonData = fs.readFileSync(filePath, "utf8");
    let parseData = JSON.parse(jsonData);
    parseData.data.push({
      role: "user",
      content: message,
    });
    const prompt = await llm(parseData.data);
    console.log(prompt.chatCompletion.choices[0].message);
    parseData.data.push(prompt.chatCompletion.choices[0].message);
    fs.writeFileSync(filePath, JSON.stringify(parseData, null, 2), "utf8");
    // fetch prompt
    // let fetchPrompt = await fetchById(id);
    // if (!fetchPrompt.status) {
    //   next(Error(fetchPrompt.error));
    // }
    let clean_prompt = cleanPrompt(
      prompt.chatCompletion.choices[0].message.content
    );
    console.log("LLM");
    // LLM
    // let llmPrompt = await llm(`${fetchPrompt.data.data} ${message}`);
    // if (!llmPrompt.status) {
    //   next(Error("Not working"));
    // }

    // console.log("Update Prompt");
    // let updatePrompt = await updatePromptByID(id, llmPrompt.message);
    // if (!updatePrompt.status) {
    //   next(Error(updatePrompt.error));
    // }
    // console.log("Cleaning prompt");

    return res.json({
      id,
      message: clean_prompt.prompt,
      options: clean_prompt.options,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const dummyController = async (req, res, next) => {
  try {
    const { id, message } = req.body;
    return res.json({
      id,
      message: message,
      options: [
        "Op1 - He died",
        "Op2 - He is running away",
        "Op3 - He is Hiding",
      ],
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const quitController = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "messages.json");
    let jsonData = fs.readFileSync(filePath, "utf8");
    let parseData = JSON.parse(jsonData);
    parseData.data = [
      {
        role: "system",
        content:
          "Your an AI Assistant which will generate a short story paragraph, present one paragraph and three options listed as option 1,2,3 the options should not exceed 20 characters long When you receive the word quit, reply with a story related goodbye.",
      },
    ];
    fs.writeFileSync(filePath, JSON.stringify(parseData, null, 2), "utf8");
    return res.json({ message: "Thank you for Playing" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  generateID,
  generateIDTest,
  fetchPromptController,
  textMeController,
  dummyController,
  quitController,
};
