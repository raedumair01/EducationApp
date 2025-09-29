📚 EducationApp

EducationApp is a React Native mobile app designed for students to manage their studies effectively. It helps track upcoming tests, view pending tasks, explore subjects, and quickly get answers to FAQs.

✨ Features

📅 Upcoming Tests – See scheduled quizzes and tests with subject & due dates.

⏳ Pending Tests – Track incomplete tests with countdown timers.

📖 Subjects Dashboard – Access categorized subjects: Mathematics, Chemistry, Physics, Reasoning.

❓ FAQs – Find instant answers to common questions or ask your own.

🎨 Modern UI – Gradient cards, clean navigation, and responsive design.

📱 Cross-platform – Works on both Android & iOS.

🛠 Tech Stack

React Native

React Navigation for routing

Context API / State Management (if used)

Custom UI Components

Secure Storage (AsyncStorage) (if used for saving data)

🚀 Getting Started
Prerequisites

Node.js >= 14

npm or yarn

React Native CLI or Expo CLI

Android Studio / Xcode (for running emulator or device build)

Installation
git clone https://github.com/raedumair01/EducationApp.git
cd EducationApp
npm install
# or
yarn install


For iOS:

cd ios && pod install && cd ..

Running the App

Start Metro bundler:

npm start


Run on Android:

npm run android


Run on iOS:

npm run ios

📂 Project Structure
.
├── src/
│   ├── components/   # Reusable UI components
│   ├── screens/      # Home, Subjects, FAQs, etc.
│   ├── navigation/   # Bottom tab navigation
│   ├── assets/       # Images, fonts
│   └── constants/    # Colors, themes
├── App.js
├── package.json
└── README.md

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/44b8c451-4882-4611-b2e3-f6f71336b5b7" width="250" />
  <img src="https://github.com/user-attachments/assets/54b82705-8f70-49a9-a114-fc0d8e23ef23" width="250" />
  <img src="https://github.com/user-attachments/assets/e28358ff-121a-424d-8840-9e96c7c05d7b" width="250" />
  <img src="https://github.com/user-attachments/assets/0dfece87-2429-446d-8560-68038bb01ffb" width="250" />
  <img src="https://github.com/user-attachments/assets/1e712958-b778-4712-9722-4a0dee896556" width="250" />
</div>
