import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function run() {
  try {
    const chat = model.startChat({
      history: [],
      systemInstruction: "You are a helpful assistant.",
    });
    
    const result = await chat.sendMessage("Hi");
    console.log(result.response.text());
  } catch (error) {
    console.error("ERROR:", error);
  }
}

run();
