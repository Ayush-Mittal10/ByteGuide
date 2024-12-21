# <img src="frontend/byteguide/src/assets/logo.png" alt="ByteGuide Logo" width="40"> ByteGuide
    
**Personalized Guidance Platform for Engineering Students**

ByteGuide is a one-stop platform for engineering students pursuing computer science or related fields. The goal? To transform you into an exceptional developer by the end of your degree, staying ahead of the crowd.

With **ByteGuide**, students receive a personalized plan for their ongoing and upcoming semesters. This plan guides them to master core concepts, develop coding skills, and ace industry challenges—all powered by cutting-edge technology.

---

## 🚀 Features  
### 🔑 Core Features
- **Personalized Semester Plans:**  
  Tailored learning plans based on your profile, interests, and coding journey.  
- **AI-Powered Recommendations:**  
  Leveraging the **Gemini API** for customized learning content and future-ready plans.  
- **Real-Time Coding Profile Integration:**  
  Automatically scrape your stats from platforms like **Codeforces**, **LeetCode**, and **GitHub** to provide actionable insights.  
- **Progress Tracking and Analytics:**  
  Detailed visualizations of semester progress, coding activity, and overall skill growth.

### 💎 Premium Benefits (Subscription Plans)
- Unlock future learning content.
- Access exclusive tasks, challenges, and learning paths.
- Payment system powered by **Razorpay** for seamless transactions.


---

## 🛠️ Technologies Used  
### Frontend:
- **React.js**: For a dynamic, interactive user interface.
- **Chart.js**: For progress visualizations and analytics.

### Backend:
- **Node.js**: Fast and scalable backend framework.  
- **Express.js**: Efficient API routing and middleware.  
- **Puppeteer**: For web scraping coding profiles from platforms like Codeforces.  
- **MongoDB**: Flexible and robust database to store user data and progress.  
- **Razorpay API**: Secure payment processing.  

### AI & Machine Learning:
- **Gen AI (Gemini API)**: Personalized learning recommendations.

---

## 📖 How It Works  
1. **Sign Up or Log In:**  
   Create a profile or log in to an existing one.  
2. **Onboarding:**  
   Provide details about your semester, interests, and coding experience.   
3. **Get Your Plan:**  
   Receive personalized semester tasks, subject breakdowns, and reference materials.  
4. **Track Your Progress:**  
   Monitor your growth with interactive graphs and weekly/monthly analytics.

---

## 🌟 Why ByteGuide?  
- Students often lack clarity on what to focus on during their degree. ByteGuide bridges this gap by **analyzing your profile** and delivering **a structured roadmap** for becoming industry-ready.
- ByteGuide ensures you're **always ahead**, providing not only technical knowledge but also insights into soft skills, competitive programming, and more.

---

## 📷 Screenshots & Demo  
### Dashboard  
![Dashboard Screenshot](assets/dashboard.png)

### Progress Tracker  
![Progress Tracker Screenshot](assets/progress-tracker.png)

### Semester Plan  
![Semester Plan Screenshot](assets/semester-plan.png)

> Check out the full demo **[here](https://byteguide.onrender.com/)**.

---

## 🛡️ Security & Privacy  
ByteGuide ensures:
- Data security through **OAuth 2.0** for secure authentication.
- User data is encrypted and stored in compliance with **privacy standards**.
- Ethical scraping practices to protect user data integrity.

---

## 🛠️ Getting Started  
### Prerequisites:
- Node.js and npm installed.
- MongoDB installed locally or cloud-based (e.g., MongoDB Atlas).

### Installation:
1. Clone the repository:  
   ```bash
   git clone https://github.com/Ayush-Mittal10/ByteGuide.git
   ```
2. Navigate to the project frontend directory:
   ```bash
   cd ByteGuide/frontend/byteguide
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Navigate to the project backend directory:
   ```bash
   cd ByteGuide/backend
   ```
6. Install dependencies:
   ```bash
   npm install
   ```
7. Start the backend server:
   ```bash
   npm run dev
   ```

### Environment Variables:
  Configure your `.env` file with the following keys:
  ```bash
  PORT=8000 //or any
  MONGO_URI=your_mongo_uri
  TOKEN_KEY=your_token_key //any string
  GEMINI_API_KEY=your_openai_api_key
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  ```

---

### 🤝 Contributions
We welcome contributions to enhance ByteGuide!

## Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request on GitHub.

---

### 📜 License
This project is licensed under the MIT License.

---

### 📬 Contact
For queries, reach out at: ayushmittal1100@gmail.com

Follow me on:
[GitHub](https://github.com/Ayush-Mittal10) | [LinkedIn](https://www.linkedin.com/in/ayushmittal10)
