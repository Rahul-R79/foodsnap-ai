import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document {
    imageHash: string;
    foodName: string;
    quantity: string;
    nutrition: {
        Calories: { quantity: number; unit: string };
        Protein: { quantity: number; unit: string };
        Fat: { quantity: number; unit: string };
        Carbohydrates: { quantity: number; unit: string };
    };
    createdAt: Date;
    updatedAt: Date;
}

const FoodSchema = new Schema(
    {
        imageHash: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        foodName: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        nutrition: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IFood>("Food", FoodSchema);
