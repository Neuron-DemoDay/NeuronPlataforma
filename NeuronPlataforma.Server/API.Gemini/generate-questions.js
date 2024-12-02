import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Agora você pode acessar suas variáveis de ambiente através de process.env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//export async function dataReceived ()
export async function generatePrompt(Prompt) {
  const response = await model.generateContent(Prompt);
  return response;
}