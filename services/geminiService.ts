import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLuckyInsight = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a friendly, culturally aware AI assistant for a Kerala Lottery tracking app.
      The user is asking for: "${query}".
      
      If they ask for lucky numbers:
      - Be fun and lighthearted.
      - Mention that lottery is a game of chance.
      - Provide 3-4 "lucky" sets of numbers (format: 4-digit or 6-digit) based on random "numerology" or just fun patterns.
      
      If they ask about dreams (Dream Interpretation):
      - Interpret the dream symbols in the context of Indian/Kerala folklore if applicable.
      - Suggest a 3-digit or 4-digit number associated with that symbol.
      
      If they ask for advice:
      - Remind them to play responsibly.
      - Do not encourage addiction.
      
      Keep the response short (under 100 words) and formatted nicely. Use emojis.
      `,
    });
    return response.text || "I couldn't generate a prediction right now. Try again later!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The stars are cloudy right now. Please try again later. (API Error)";
  }
};
