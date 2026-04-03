require('dotenv').config({ path: '.env.local' });
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function main() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Hi" }],
      model: "qwen-2.5-32b",
    });
    console.log(chatCompletion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}
main();
