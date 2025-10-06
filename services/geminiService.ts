
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A concise summary of the provided text.',
    },
    keyPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'A list of the most important key points from the text.',
    },
  },
  required: ['summary', 'keyPoints'],
};

export async function summarizeAndExtractPoints(
  text: string,
  language: string
): Promise<GenerationResult> {
  try {
    const prompt = `
      Analyze the following text.
      Provide a concise summary and a list of the most important key points.
      The entire response, including summary and key points, must be in ${language}.

      TEXT:
      """
      ${text}
      """
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (parsedResult && typeof parsedResult.summary === 'string' && Array.isArray(parsedResult.keyPoints)) {
        return parsedResult as GenerationResult;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
}
