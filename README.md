# INST377---Final-Project--spr25

# Nutrition Intuition

## This application main purpose is to help users maintain a healthy, well-balanced diet by simplifying the process of tracking meals, setting nutrition goals, and receiving real-time, accurate dietary information. Using the Spoonacular API, users can search for meals, log them into their daily tracker, and visualize their nutritional intake.

## Target Browsers
- iOS Safari
- Android Chrome

# Developer Manual 
##Installation & Setup

## 1. Clone the Repository
git clone -> your repository 

## 2. Install Dependencies 
- npm install

## 3. need variables
SPOONACULAR_API_KEY=your_api_key_here
SUPABASE_URL=https://your-supabase-instance.supabase.co
SUPABASE_KEY=your_supabase_anon_key

API documentation
Ex.
{
  "food": "banana",
  "calories": 89,
  "protein": 1.1,
  "carbs": 22.8,
  "fat": 0.3
}
For logging meals to Supabase
{
  "userId": "abc123",
  "food": "banana",
  "calories": 89
}

## Future Roadmap
Add user authentication

Build a personal dashboard for past meal logs

Visualize weekly nutrition stats using Chart.js

Add dark mode toggle

Write unit tests for backend functions
