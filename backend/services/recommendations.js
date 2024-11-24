import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const schema = {
  description: "Personalized recommendations for a Computer Science and Engineering student in India, tailored to their skills and progress in the degree program.",
  type: SchemaType.OBJECT,
  properties: {
    overallProgress: {
      type: SchemaType.NUMBER,
      description: "Overall progress percentage of the degree",
      nullable: false
    },
    semesters: {
      type: SchemaType.ARRAY,
      description: "List of semesters",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.NUMBER,
            description: "Unique identifier for the semester",
            nullable: false
          },
          name: {
            type: SchemaType.STRING,
            description: "Name of the semester",
            nullable: false
          },
          subjects: {
            type: SchemaType.ARRAY,
            description: "List of subjects in the semester",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: {
                  type: SchemaType.NUMBER,
                  description: "Unique identifier for the subject",
                  nullable: false
                },
                title: {
                  type: SchemaType.STRING,
                  description: "Title of the subject",
                  nullable: false
                },
                description: {
                  type: SchemaType.STRING,
                  description: "Brief description of the subject",
                  nullable: true 
                },
                tasks: {
                  type: SchemaType.ARRAY,
                  description: "List of essential tasks for the subject",
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      task: {
                        type: SchemaType.STRING,
                        description: "Description of the task",
                        nullable: false
                      },
                    },
                    required: ["task"]
                  },
                },
                resources: {
                  type: SchemaType.ARRAY,
                  description: "Resources for the subject",
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      name: {
                        type: SchemaType.STRING,
                        description: "Name of the resource",
                        nullable: false
                      },
                      url: {
                        type: SchemaType.STRING,
                        description: "URL of the resource",
                        nullable: false
                      },
                    },
                    required: ["name", "url"]
                  },
                },
              },
              required: ["id", "title", "tasks", "resources"]
            },
          },
        },
        required: ["id", "name", "subjects"]
      }
    },
    proTip: {
      type: SchemaType.STRING,
      description: "General tip or advice for the student",
      nullable: false
    },
  },
  required: ["overallProgress", "semesters", "proTip"]
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 1,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

function generatePrompt(userData, schema) {
  return `Generate a JSON response adhering to the provided schema:
    \`\`\`json
    ${JSON.stringify(schema, null, 2)} 
    \`\`\`

    The JSON should represent personalized recommendations for a Computer Science and Engineering student in India, currently in their ${userData.semester}th semester.

    **Student Profile:**
    * **Languages Learned:** ${userData.languages} (Self-rated proficiency: ${userData.languageRatings})
    * **Libraries (language-specific):** ${userData.libraries}
    * **Other Libraries:** ${userData.otherLibraries}
    * **Frameworks:** ${userData.frameworks}

    **Competitive Programming:**
    ${userData.cpOption ? `* **Platforms:** ${userData.selectedPlatforms} (Usernames: ${userData.usernames})` : "* Has not yet started competitive programming."}
    ${userData.CodeforcesStats ? `* **Codeforces Stats:**  ${JSON.stringify(userData.CodeforcesStats, null, 2)}` : ""} // Use JSON.stringify for structured data

    **Projects:**
    ${userData.projectOption ? `* **Project Links:** ${userData.projectLink}` : "* Has not yet started working on projects."}

    The generated JSON should include semester-specific recommendations for subjects, learning resources, and tasks, tailored to the student's skills. The \`overallProgress\` field should reflect an estimated progress percentage, and a relevant \`proTip\` should be included.
    `;
}

export async function fetchRecommendations(userData) {
  try {
    const prompt = generatePrompt(userData, schema);
    const result = await model.generateContent(prompt);
    console.log("Result:", result);
    const Response = result.response.text();
    return Response;

  } catch (error) {
    console.error("Error in fetchRecommendations:", error);
    throw error;
  }
}
