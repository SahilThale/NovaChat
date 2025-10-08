/*
 ? Install the Generative AI SDK
 & $ npm install @google/generative-ai
*/

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// 🔹 Replace with your actual API key (keep this private in production!)
const apiKey = "AIzaSyCaGykltmShSW4Wp1X3xR3oYcwVDaHnnfk";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ Updated model name (Gemini 2.x series)
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // 🔹 previously gemini-1.5-flash
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 50,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      // Optional safety settings
      // safetySettings: [
      //   { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
      // ],
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "⚠️ Something went wrong while contacting the Gemini API.";
  }
}

export default run;
