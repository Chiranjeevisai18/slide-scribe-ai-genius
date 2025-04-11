import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash', // FREE tier-supported fast model
});

interface SlideContent {
  title: string;
  content: string[];
  imagePrompt?: string;
}

export async function generateSlideContent(topic: string, textInput: string): Promise<SlideContent[]> {
  try {
    const prompt = `Create a presentation outline for "${topic}" with the following format for each slide:
    - A clear title
    - 2-3 bullet points
    - A relevant image description
    Return it strictly as a JSON array of objects with fields: title, content[], imagePrompt.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch {
      console.warn('Non-JSON response from Gemini:', text);
      throw new Error('Invalid JSON from Gemini');
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function getAIAssistantSuggestions(question: string): Promise<string> {
  if (!question.trim()) {
    throw new Error('Question cannot be empty');
  }

  try {
    const prompt = `You're an expert in presentations. Please help answer this question clearly and professionally:

    "${question}"

    Give practical and immediately useful advice.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No AI suggestions returned');
    }

    return text;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw new Error('Failed to get AI suggestions. Please try again.');
  }
}
