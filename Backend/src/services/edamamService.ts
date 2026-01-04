import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

export interface NutritionData {
    calories: number;
    totalNutrients: {
        PROCNT: { quantity: number; unit: string }; 
        FAT: { quantity: number; unit: string }; 
        CHOCDF: { quantity: number; unit: string }; 
    };
    [key: string]: any;
}

export const getNutritionData = async (quantity: string, foodName: string): Promise<NutritionData> => {
    try {
        const query = `${quantity} ${foodName}`;

        const response = await axios.get("https://api.edamam.com/api/nutrition-data", {
            params: {
                app_id: EDAMAM_APP_ID,
                app_key: EDAMAM_APP_KEY,
                ingredient: query,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Edamam API Error:', error);
        throw new Error('Failed to fetch nutrition data from Edamam');
    }
};
