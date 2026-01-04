import instance from "../config/axios"; 

export interface NutritionInfo {
    Calories: { quantity: number; unit: string };
    Protein: { quantity: number; unit: string };
    Fat: { quantity: number; unit: string };
    Carbohydrates: { quantity: number; unit: string };
}

export interface AnalyzeResponse {
    imageHash: string;
    foodName: string;
    quantity: string;
    nutrition: NutritionInfo;
}

export const analyzeImage = async (imageFile: File): Promise<AnalyzeResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await instance.post<AnalyzeResponse>('/analyze', formData);

    return response.data;
};
