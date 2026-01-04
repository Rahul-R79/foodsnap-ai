import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface GeminiResponse {
    foodName: string;
    quantity: string;
}

export const analyzeWithGemini = async (
    imageBuffer: Buffer,
    mimeType: string
): Promise<GeminiResponse> => {
    try {
        const prompt = `
      Analyze this food image. 
      Identify the food item and estimate the portion size/quantity.
      Return ONLY a valid JSON object in the following format, with no markdown code blocks:
      {
        "foodName": "name of food",
        "quantity": "estimated quantity (e.g., 100gm, 1kg)"
      }
    `;

        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: mimeType,
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        const jsonResponse: GeminiResponse = JSON.parse(text);
        return jsonResponse;
    } catch (error) {
        throw new Error("Failed to analyze image with Gemini");
    }
};
