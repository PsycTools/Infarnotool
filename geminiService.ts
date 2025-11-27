
import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateText = async (prompt: string, model: string = 'gemini-2.5-flash'): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "The void returned silence.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error from the depths: ${(error as Error).message}`;
  }
};

export const generateImageCaption = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Image
            }
          },
          { text: "Describe this image in detail." }
        ]
      }
    });
    return response.text || "No description available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${(error as Error).message}`;
  }
};

export const chatWithAi = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
    try {
        const ai = getClient();
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
        });
        const result = await chat.sendMessage({ message });
        return result.text || "";
    } catch (error) {
        console.error("Gemini Chat Error", error);
        return "Connection to the Demon Realm severed.";
    }
}

/**
 * Uses Gemini to generate an image based on the prompt.
 * Uses gemini-2.5-flash-image which supports text-to-image generation.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: prompt }
                ]
            }
        });
        
        // Iterate through parts to find the image
        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        
        return ""; // No image found
    } catch (error) {
        console.error("Gemini Image Gen Error:", error);
        throw new Error(`Failed to summon image: ${(error as Error).message}`);
    }
}
