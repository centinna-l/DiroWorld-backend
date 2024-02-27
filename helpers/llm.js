const OpenAI = require("openai").OpenAI;

const openai = new OpenAI({
  //   baseURL: "http://blg45.iro.umontreal.ca:8080/v1",
  baseURL: "http://127.0.0.1:8080/v1",
  apiKey: "sk-no-key-required",
});

const llm = async (message) => {
  console.log("inside the llm function \n", message);
  const chatCompletion = await openai.chat.completions.create({
    // messages: [{ role: "user", content: message }],
    messages: message,
    model: "LLaMA_CPP",
    temperature: 0.7,
    top_p: 0.8,
  });
  //   console.log(chatCompletion);
  console.log(chatCompletion.choices[0].message.content);
  return {
    chatCompletion,
  };
};

module.exports = { llm };
