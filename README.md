# FoodSnap AI 🍎📸

**FoodSnap AI** is a smart nutrition tracking application that leverages artificial intelligence to analyze food images, identify dishes, and estimate their nutritional content.

## 🚩 Problem Statement

Tracking daily nutritional intake is often a tedious and error-prone process. Users struggle to accurately estimate portion sizes and identify the caloric content of complex dishes. This friction leads to inconsistent tracking, lack of awareness about actual intake, and ultimately, a loss of motivation to maintain healthy dietary habits.

## 💡 Solution

**FoodSnap AI** eliminates the guesswork from nutrition tracking. By leveraging advanced computer vision and Generative AI (Google Gemini), the application instantly analyzes food photos to identify dishes and estimate portion sizes. It then cross-references this data with a reliable nutrition database (Edamam) to provide an accurate breakdown of calories, proteins, fats, and carbohydrates. This seamless, "snap-and-track" experience empowers users to make informed dietary choices with minimal effort.

## 🚀 Features

-   **AI-Powered Analysis**: Uses Google's Gemini AI to identify food items and estimate portion sizes from images.
-   **Detailed Nutrition Data**: Integrates with the Edamam API to retrieve accurate calorie, protein, fat, and carbohydrate information.
-   **History & Tracking**: Keeps a record of your analyzed meals (stored via MongoDB).
-   **Responsive Design**: Built with React and Tailwind CSS for a modern, mobile-friendly interface.

## 🛠️ Tech Stack

### Frontend

-   **React** (v19)
-   **Vite**
-   **Tailwind CSS** (v4)
-   **Axios**
-   **TypeScript**

### Backend

-   **Node.js**
-   **Express**
-   **MongoDB** (with Mongoose)
-   **Google Generative AI (Gemini)** SDK
-   **Edamam API**
-   **TypeScript**

---

## ⚙️ Setup & Installation

Follow these steps to get the project running locally.

### 1. Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v16+)
-   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud Atlas URI)

You will also need API keys for:

-   [Google Gemini API](https://ai.google.dev/)
-   [Edamam Nutrition Analysis API](https://www.edamam.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/Rahul-R79/foodsnap-ai.git
cd foodsnap-ai
```

### 3. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Backend` directory and add the following variables:
    ```env
    MONGO_URL=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    EDAMAM_APP_ID=your_edamam_app_id
    EDAMAM_APP_KEY=your_edamam_app_key
    PORT=8080 
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server should start on `http://localhost:8080`.

### 4. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Frontend` directory (if not already present, though Vite uses `.env` files for environment variables) or ensure your `src/config/axios.ts` points to the correct backend URL. Typically, for Vite:
    ```env
    VITE_API_URL=http://localhost:8080
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The app will usually be available at `http://localhost:5173`.

---

## 📖 Usage

1.  Open the application in your browser.
2.  Upload or take a photo of your food.
3.  Wait for the AI to analyze the image.
4.  View the identified food name, estimated quantity, and nutritional breakdown.


