# fitness_app
Gym Training Diary App is a smart workout logging application that lets users create personalized training programs, define weekly progression logic (light/medium/heavy cycles), track weights, tonnage, 1RM estimates, and analyze performance trends.
The app stores data locally and in the cloud, supports social features like following friends’ workouts, and integrates a lightweight server‑side LLM for training analysis and personalized recommendations.
Future versions will connect to smartwatches to adjust training advice based on sleep, HRV, and stress metrics.

## 🚀 Features
- Custom training programs with progression logic  
- Workout logging with tonnage & 1RM tracking  
- Exercise history & statistics  
- Social feed to follow friends' workouts  
- AI-powered training analysis (Phase 3)  
- Backend: Node.js + PostgreSQL + Docker  
- Mobile app: Clean Architecture + MVVM  

## 🏗️ Project Structure
backend/
api-service/
ai-service/
db/
mobile-app/
data/
domain/
ui/

## 🗄️ Database (simplified)
- users  
- training_programs  
- workouts  
- workout_exercises  
- exercise_sets  

## 🧠 AI Service (Phase 3)
Lightweight LLM for:
- workout analysis  
- recommendations  
- program optimization  

## 📦 Tech Stack
- Node.js / Express  
- PostgreSQL / Prisma  
- Docker & Docker Compose  
- Kotlin Android (MVVM + Clean Architecture)  
- FastAPI (AI service)  

## 📄 License
MIT
