import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document {
    imageHash: string;
    foodName: string;
    quantity: string;
    nutrition: {
        calories: number;
        totalNutrients: {
            PROCNT: { quantity: number; unit: string };
            FAT: { quantity: number; unit: string };
            CHOCDF: { quantity: number; unit: string };
        };
        [key: string]: any;
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
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IFood>("Food", FoodSchema);
