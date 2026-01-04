import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

export interface NutritionData {
    Calories: { quantity: number; unit: string };
    Protein: { quantity: number; unit: string };
    Fat: { quantity: number; unit: string };
    Carbohydrates: { quantity: number; unit: string };
}

export const getNutritionData = async (quantity: string, foodName: string): Promise<NutritionData> => {
    try {
        const query = `${quantity} ${foodName}`;

        const response = await axios.get("https://api.edamam.com/api/nutrition-data", {
            params: {
                app_id: EDAMAM_APP_ID,
                app_key: EDAMAM_APP_KEY,
                ingr: query,
            },
        });

        const data = response.data;

        let finalNutrition: NutritionData = {
            Calories: { quantity: 0, unit: 'kcal' },
            Protein: { quantity: 0, unit: 'g' },
            Fat: { quantity: 0, unit: 'g' },
            Carbohydrates: { quantity: 0, unit: 'g' }
        };

        const hasTopLevelData = data.totalNutrients && Object.keys(data.totalNutrients).length > 0;

        if (hasTopLevelData) {
            if (data.totalNutrients.ENERC_KCAL) {
                finalNutrition.Calories = { quantity: data.totalNutrients.ENERC_KCAL.quantity, unit: data.totalNutrients.ENERC_KCAL.unit };
            }
            if (data.totalNutrients.PROCNT) {
                finalNutrition.Protein = { quantity: data.totalNutrients.PROCNT.quantity, unit: data.totalNutrients.PROCNT.unit };
            }
            if (data.totalNutrients.FAT) {
                finalNutrition.Fat = { quantity: data.totalNutrients.FAT.quantity, unit: data.totalNutrients.FAT.unit };
            }
            if (data.totalNutrients.CHOCDF) {
                finalNutrition.Carbohydrates = { quantity: data.totalNutrients.CHOCDF.quantity, unit: data.totalNutrients.CHOCDF.unit };
            }

        } else if (data.ingredients && data.ingredients.length > 0) {
            const parsed = data.ingredients[0].parsed;
            if (parsed && parsed.length > 0 && parsed[0].nutrients) {
                const n = parsed[0].nutrients;

                if (n.ENERC_KCAL) finalNutrition.Calories = { quantity: n.ENERC_KCAL.quantity, unit: n.ENERC_KCAL.unit };
                if (n.PROCNT) finalNutrition.Protein = { quantity: n.PROCNT.quantity, unit: n.PROCNT.unit };
                if (n.FAT) finalNutrition.Fat = { quantity: n.FAT.quantity, unit: n.FAT.unit };
                if (n.CHOCDF) finalNutrition.Carbohydrates = { quantity: n.CHOCDF.quantity, unit: n.CHOCDF.unit };
            }
        }

        return finalNutrition;
    } catch (error) {
        throw new Error('Failed to fetch nutrition data from Edamam');
    }
};
