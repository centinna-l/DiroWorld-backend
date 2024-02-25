const OpenAI = require("openai").OpenAI;

const openai = new OpenAI({
  baseURL: "http://blg45.iro.umontreal.ca:8080/v1",
  apiKey: "sk-no-key-required",
});

const llm = async (message) => {
  console.log("inside the llm function \n", message);
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "LLaMA_CPP",
  });
  //   console.log(chatCompletion);
  return {
    message: chatCompletion.choices[0].message.content,
  };
};

module.exports = { llm };
