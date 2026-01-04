import { Request, Response } from "express";
import crypto from "crypto";
import { analyzeWithGemini } from "../services/geminiService";
import { getNutritionData } from "../services/edamamService";
import Food from "../models/Food";

export const analyzeImage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No image uploaded" });
            return;
        }

        const imageBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;

        const imageHash = crypto
            .createHash("sha256")
            .update(imageBuffer)
            .digest("hex");

        const cachedFood = await Food.findOne({ imageHash });
        if (cachedFood) {
            res.json(cachedFood);
            return;
        }

        const geminiResult = await analyzeWithGemini(imageBuffer, mimeType);

        const nutritionData = await getNutritionData(
            geminiResult.quantity,
            geminiResult.foodName
        );

        const newFood = new Food({
            imageHash,
            foodName: geminiResult.foodName,
            quantity: geminiResult.quantity,
            nutrition: nutritionData,
        });

        await newFood.save();

        res.json(newFood);
    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({
            message: "Failed to analyze image",
            error: (error as Error).message,
        });
    }
};
