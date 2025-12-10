
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.INTEGER,
      description: "A percentage score from 0 to 100 representing how well the CV matches the job description. 100 is a perfect match."
    },
    summary: {
      type: Type.STRING,
      description: "A concise, 2-3 sentence summary of the candidate's suitability for the role."
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key strengths and qualifications from the CV that align with the job description."
    },
    improvements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of areas where the CV could be improved or where there are gaps relative to the job description."
    },
    skillAnalysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING, description: "The specific skill or requirement being analyzed." },
          score: { type: Type.INTEGER, description: "A score from 0 to 100 for this specific skill." },
          reasoning: { type: Type.STRING, description: "A brief justification for the skill score, citing evidence from the CV." }
        },
        required: ["skill", "score", "reasoning"]
      },
      description: "A detailed breakdown of how major skills from the job description are met by the CV."
    }
  },
  required: ["matchScore", "summary", "strengths", "improvements", "skillAnalysis"]
};


export const analyzeCVWithGemini = async (cvText: string, jobDescription: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following CV content against the provided job description.
    Act as an expert career coach and hiring manager. Provide a detailed, constructive, and unbiased analysis.
    The output must be a JSON object that strictly adheres to the provided schema.

    **CV Content:**
    ---
    ${cvText}
    ---

    **Job Description:**
    ---
    ${jobDescription}
    ---

    Your analysis should highlight how the candidate's experience, skills, and qualifications align with the job requirements.
    Calculate a match score, summarize the fit, list strengths and areas for improvement, and provide a scored breakdown of key skills.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    // In case the API wraps the JSON in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const result: AnalysisResult = JSON.parse(cleanedJsonText);
    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
