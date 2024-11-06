import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function fetchRecommendations(userData) {
  try {
    const prompt = `Generate personalized recommendations for a Computer Science and Engineering student of India, who is currently in ${userData.semester}th semester.
    Up till now, he/she has learnt the following languages: ${userData.languages}. Based on own understandings, he/she rates himself/herself on the learnt languages as ${userData.languageRatings} on a scale of 1-10.
    The libraries he/she has learnt in the provided languages are: ${userData.libraries}. Other libraries include ${userData.otherLibraries}.
    He/she has also learnt the following frameworks: ${userData.frameworks} and has worked on it.
    ${userData.cpOption ? `He/she has been practicing competitive programming as well, in the platform such as ${userData.selectedPlatforms}, having usernames - ${userData.usernames}.` : "He/she has not yet started with competitive programming, so starting with beginner-level problems could be beneficial."}
    ${userData.projectOption ? `He/she has also worked on some projects, such as ${userData.projectLink}.` : "He/she has not yet started with any projects, so starting with small projects could be beneficial."}
    ${userData.CodeforcesStats ? `On Codeforces, his/her stats are as follows: Total Problems Solved - ${userData.CodeforcesStats.totalProblemsSolved}, Difficulty-Wise Problem Counts - Easy: ${userData.CodeforcesStats.easy}, Medium: ${userData.CodeforcesStats.medium}, Hard: ${userData.CodeforcesStats.hard}, Total Active Days - ${userData.CodeforcesStats.totalActiveDays}, Max Streak - ${userData.CodeforcesStats.maxStreak}, Contest Rating - ${userData.CodeforcesStats.rating}, Level - ${userData.CodeforcesStats.level}, Global Ranking - ${userData.CodeforcesStats.globalRanking}, Top Percentage - ${userData.CodeforcesStats.topPercentage}, Contest Attendance - ${userData.CodeforcesStats.contestAttendance}.` : ""}
    
    Return a structured learning plan using this JSON format. The schema should match the following structure:

    {
      "overallProgress": number,
      "semesters": [
        {
          "id": number, // Unique identifier for the semester
          "name": string, // Name of the semester (e.g., "Semester 1")
          "progress": number, // Progress percentage for the specific semester
          "subjects": [
            {
              "id": number, // Unique identifier for the subject
              "title": string, // Title of the subject (e.g., "Data Structures")
              "description": string, // Brief description of the subject
              "tasks": [
                { "task": string } // Task descriptions related to the subject
              ],
              "resources": [
                { 
                  "name": string, // Name of the resource (e.g., "GeeksforGeeks - Data Structures")
                  "url": string // URL link to the resource
                }
              ]
            }
          ]
        }
      ],
      "proTip": string // General tip or advice for the student
    }

    Based on the student's current progress, generate appropriate subjects, tasks, and resources that will help them advance in their studies. Ensure all fields adhere to the above schema format.
    No explanation is required, only the structured learning plan is needed in json.`;


  const result = await model.generateContent(prompt);
  return result.response.text();

  } catch (error) {
    console.error("Error in fetchRecommendations:", error);
    throw error;
  }
}
