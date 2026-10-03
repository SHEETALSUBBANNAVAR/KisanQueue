# 🌾 KisanQueue

## Smart Procurement Centre & Predictive Queue Management System

KisanQueue is a **Smart India Hackathon (SIH) project** designed to improve the agricultural procurement experience by reducing waiting time, providing digital queue management, recommending suitable procurement slots, and helping farmers track procurement and payment status.

The platform provides separate workflows for **Farmers, Procurement Operators, and Administrators**.

---

## 🔗 Project Links

🌐 **Live Demo:**  
https://kisanqueue18.netlify.app/

💻 **GitHub Repository:**  
https://github.com/SHEETALSUBBANNAVAR/KisanQueue

---

## 📌 Problem Statement

Farmers visiting procurement centres may have to wait for long periods because of unpredictable queues, limited information about waiting times, and inefficient scheduling.

This can lead to:

- Long waiting times
- Unnecessary travel and fuel consumption
- Congestion at procurement centres
- Difficulty planning arrival time
- Lack of real-time queue information
- Difficulty tracking procurement status
- Uncertainty about payment status

KisanQueue aims to address these challenges through a digital procurement and queue management platform.

---

## 💡 Our Solution

KisanQueue provides a centralized digital platform where farmers can:

- Select their crop
- Enter the expected quantity
- Select a procurement centre
- View recommended time slots
- Book a procurement slot
- Receive a digital token
- Track their queue position
- View estimated waiting time
- Receive turn-approaching notifications
- Track procurement status
- Track payment status

Procurement operators can manage queues and procurement activities, while administrators can monitor centres, queues, forecasts, procurement information, and system alerts.

---

## ✨ Key Features

### 👨‍🌾 Farmer Features

- Farmer registration and login
- Farmer dashboard
- Crop selection
- Quantity selection
- Procurement centre selection
- Smart slot recommendation
- Slot booking
- Digital token generation
- Booking confirmation
- Live queue tracking
- Estimated waiting time
- Turn-approaching notifications
- Procurement status tracking
- Payment status tracking
- Booking history
- Notifications
- Multi-language support

### 🏪 Operator Features

- View current queue
- View farmer appointments
- Verify farmer tokens
- Call the next farmer
- Monitor queue progress
- Record actual quantity
- Record moisture percentage
- Record quality status
- Record weighbridge slip number
- Complete procurement
- Update payment processing status
- Receive operational notifications

### 🏛️ Admin Features

- Monitor procurement centres
- Monitor queue statistics
- View demand information
- View queue forecasts
- Monitor procurement statistics
- Monitor payment information
- View system alerts
- Manage notifications
- View operational information
- View predictive model information

---

## 🤖 Predictive Queue Management

KisanQueue includes a predictive queue management feature that estimates the expected waiting time at procurement centres.

The prediction logic considers factors such as:

- Number of farmers ahead
- Number of active counters
- Average processing time
- Time of day
- Crop type
- Quantity of produce
- Current queue load

The system provides:

- Estimated waiting time
- Expected queue load
- Prediction confidence
- Processing throughput
- Quantity-related processing factor

> **Note:** The current implementation is a **prototype predictive engine** designed for the SIH demonstration. It can later be replaced with a production machine-learning API trained using real procurement data.

---

## 📅 Smart Slot Recommendation

KisanQueue recommends suitable procurement slots based on expected queue workload.

A slot can provide:

- Time window
- Expected queue load
- Estimated waiting time
- Available capacity
- Recommendation reason

### Example

```text
10:30 AM - 11:00 AM
Expected Load: Low
Estimated Wait: 20 minutes
Status: Recommended
```

This helps farmers plan their visit instead of arriving without knowing the expected waiting time.

---

## 🎫 Digital Token System

After booking a procurement slot, the farmer receives a digital token.

The token is used to identify the farmer in the procurement queue.

### Token Flow

```text
Farmer
   ↓
Select Procurement Centre
   ↓
Select Slot
   ↓
Book Appointment
   ↓
Digital Token Generated
   ↓
Join Queue
   ↓
Track Queue
   ↓
Turn Approaching
   ↓
Called by Operator
   ↓
Procurement
   ↓
Payment
```

---

## 📊 Live Queue Tracking

Farmers can track their queue status digitally.

The queue interface can provide:

- Current token being served
- Farmer's token
- Number of farmers ahead
- Estimated waiting time
- Queue progress
- Turn status

This improves transparency and helps farmers plan their time.

---

## 🔔 Notification System

KisanQueue includes a notification system for important procurement events.

Notifications can include:

- Turn approaching
- Farmer called
- Procurement completed
- Payment status updated
- Quality verification
- Operational alerts
- Centre-level alerts

The application supports:

- Mark as read
- Clear notifications
- Role-based notifications

---

## 🌐 Multi-Language Support

KisanQueue includes a translation architecture to support a multilingual user experience.

This makes the platform easier to adapt for farmers with different language preferences.

The translation system is designed so additional languages can be added in the future.

---

## 🔄 Complete Farmer Workflow

```text
Login / Registration
        ↓
Farmer Dashboard
        ↓
Select Crop
        ↓
Enter Quantity
        ↓
Select Procurement Centre
        ↓
View Recommended Slots
        ↓
Book Slot
        ↓
Receive Digital Token
        ↓
Track Live Queue
        ↓
Receive Turn Notification
        ↓
Reach Procurement Centre
        ↓
Token Verification
        ↓
Procurement
        ↓
Quality / Weight Verification
        ↓
Procurement Completed
        ↓
Payment Processing
        ↓
Payment Completed
```

---

## 👥 Application Roles

### 1. Farmer

```text
Farmer
   ↓
Book Slot
   ↓
Receive Token
   ↓
Track Queue
   ↓
Get Notification
   ↓
Procurement
   ↓
Track Payment
```

### 2. Operator

```text
Operator
   ↓
View Queue
   ↓
Call Next Farmer
   ↓
Verify Token
   ↓
Process Procurement
   ↓
Record Weight / Quality
   ↓
Complete Procurement
   ↓
Update Payment
```

### 3. Admin

```text
Admin
   ↓
Monitor Centres
   ↓
Monitor Queues
   ↓
View Forecasts
   ↓
Monitor Procurement
   ↓
Monitor Payments
   ↓
View Alerts and Analytics
```

---

## 🏗️ System Architecture

```text
                         KISANQUEUE
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
   FARMER PORTAL       OPERATOR DASHBOARD    ADMIN DASHBOARD
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ↓
                     APPLICATION LAYER
                              │
          ┌──────────┬────────┼────────┬──────────┐
          ↓          ↓        ↓        ↓          ↓
       BOOKING     QUEUE  NOTIFICATION PROCUREMENT PREDICTION
                                                     │
                                                     ↓
                                              PAYMENT TRACKING
```

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion

### Application Architecture

- React Components
- React Context API
- React Hooks
- TypeScript Interfaces
- Modular Services
- State Management

### AI / Prediction

- Google Gemini integration support
- Predictive queue recommendation engine
- Prototype queue prediction logic

### Development Tools

- Git
- GitHub
- VS Code
- npm
- Netlify
- Vite

---

## 📦 Main Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini
- Lucide React
- Motion
- Express
- dotenv
- Git
- GitHub
- Netlify

---

## 📁 Project Structure

```text
KisanQueue/
│
├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── landing/
│   │   ├── farmer/
│   │   ├── operator/
│   │   └── admin/
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── services/
│   │   ├── mockData.ts
│   │   ├── predictiveEngine.ts
│   │   └── translations.ts
│   │
│   ├── App.tsx
│
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── metadata.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

Check versions:

```bash
node --version
npm --version
git --version
```

---

## 💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SHEETALSUBBANNAVAR/KisanQueue.git
```

### 2. Go to the Project Directory

```bash
cd KisanQueue
```

### 3. Install Dependencies

```bash
npm install
```

### 4. 🔐 Environment Variables

If your local configuration requires a Gemini API key, create a `.env.local` file.

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ **Do not commit your actual API key to GitHub.**

Keep sensitive keys inside environment variables.

---

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

---

## 🏗️ Production Build

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🌐 Deployment

The project is deployed using Netlify.

### 🌐 Live Application

https://kisanqueue18.netlify.app/

### 💻 GitHub Repository

https://github.com/SHEETALSUBBANNAVAR/KisanQueue

---

## 🧪 Prototype / Demo

KisanQueue is currently presented as a **Smart India Hackathon prototype**.

The prototype contains demonstration data and workflows for:

- Farmers
- Procurement centres
- Appointments
- Queue tokens
- Procurement
- Payments
- Notifications
- Forecasts

This allows the complete workflow to be demonstrated without depending on a production backend.

---

## 🌱 Expected Impact

### 👨‍🌾 For Farmers

- Reduce unnecessary waiting
- Plan procurement visits
- View queue information
- Receive timely notifications
- Track procurement
- Track payment status

### 🏪 For Procurement Centres

- Improve queue visibility
- Manage farmer flow
- Improve counter utilization
- Track procurement operations
- Reduce congestion

### 🏛️ For Administrators

- Monitor procurement centres
- Monitor queue conditions
- View demand information
- Identify potential congestion
- Monitor procurement activity
- Monitor payment information

---

## 🔮 Future Enhancements

The current prototype can be extended into a production-ready platform.

### ⚙️ Backend

Future versions can include:

- Node.js backend
- Express.js REST APIs
- Secure authentication
- Role-based authorization
- Database integration
- API-based queue management

### 🗄️ Database

A production database can store:

- Farmer profiles
- Procurement centres
- Bookings
- Tokens
- Queue records
- Procurement records
- Payment records
- Notifications

### ⚡ Real-Time Queue

Future versions can use:

- WebSockets
- Socket.IO
- Server-Sent Events

to provide real-time queue updates.

### 🤖 Machine Learning

The prototype prediction engine can later be replaced with a trained machine-learning model using real historical procurement data.

Potential ML inputs:

- Historical queue length
- Number of active counters
- Average processing time
- Crop type
- Quantity
- Time of day
- Day of week
- Centre workload
- Historical demand

### 🔔 Notifications

Future versions can integrate:

- SMS
- WhatsApp
- Push Notifications
- Voice Notifications

### 🏛️ Government Integration

Future versions could integrate with appropriate government procurement and payment systems where APIs and authorization are available.

---

## 📈 Future ML Pipeline

```text
Historical Procurement Data
        ↓
Data Cleaning
        ↓
Feature Engineering
        ↓
Training Dataset
        ↓
Machine Learning Model
        ↓
Queue / Waiting Time Prediction
        ↓
Smart Slot Recommendation
        ↓
Farmer
```

---

## 🏆 Smart India Hackathon

KisanQueue was developed as a **Smart India Hackathon (SIH) project** with the goal of improving the agricultural procurement experience through digital queue management, smart scheduling, procurement tracking, and predictive queue estimation.

The project demonstrates how modern web technologies can be used to create a farmer-focused digital procurement workflow.

---

## 🎓 Learning Outcomes

Through this project, we gained practical experience in:

- React
- TypeScript
- Component-based architecture
- React Hooks
- React Context API
- State management
- Responsive UI development
- Tailwind CSS
- Predictive logic
- Queue management
- Role-based workflows
- Notification systems
- Multi-language support
- Git
- GitHub
- Vite
- Netlify deployment
- Environment variables
- AI integration concepts

---

## 👥 Team

### 🌾 KisanQueue — Smart India Hackathon Project

| 👤 Team Member | 💼 Role | 🎯 Responsibility |
|---|---|---|
| **Sheetal Subbannavar** | 💻 Full-Stack Developer | Frontend, backend, API integration, and core application development |
| **Shreya Shetty** | 🤖 AI / Predictive Analytics Developer | Queue prediction, waiting-time estimation, and smart slot recommendation |
| **Sankeerth S** | 🎨 UI/UX Designer | User interface, user experience, layouts, and design |
| **Vignesh S** | 📊 Data & Database Analyst | Data structure, database planning, and data management |
| **Shreyas M** | 🧪 Testing & QA Engineer | Testing, bug detection, quality assurance, and validation |
| **Shrusti R** | 📋 Project Manager / Team Lead | Project coordination, planning, documentation, and team management |

### 🚀 Team KisanQueue

> **Smart Procurement. Smarter Queues. Better Farmer Experience.** 🌾

---

## 🔒 Security

Never commit API keys, passwords, or other sensitive information to GitHub.

Use environment variables for secrets.

### Example

```env
GEMINI_API_KEY=your_secret_key
```

### Recommended `.gitignore`

```gitignore
node_modules/
dist/
.env
.env.local
.env.*.local
```

---

## 📜 License

This project was developed as an educational and hackathon project.

---

## ⭐ Project Links

🌐 **Live Demo:**  
https://kisanqueue18.netlify.app/

💻 **GitHub Repository:**  
https://github.com/SHEETALSUBBANNAVAR/KisanQueue

---

# 🌾 KisanQueue

### Smart Procurement. Smarter Queues. Better Farmer Experience.
