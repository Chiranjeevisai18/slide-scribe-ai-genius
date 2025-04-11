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
      // Include the user's text input in the prompt if provided
      const contentContext = textInput.trim() 
        ? `Using the following content as reference: "${textInput}"`
        : "Create a comprehensive outline";
      
      const prompt = `${contentContext} for a presentation titled "${topic}".
      
      Structure the presentation with the following format for each slide:
      - A concise, engaging title for each slide
      - 2-3 bullet points of key information for each slide
      - A brief image prompt describing what kind of image would enhance this slide
      - A suggested layout type for each slide (one of: "title", "bullets", "split", "quote", "image-focus")
      
      Start with a title slide, then include 4-6 content slides that develop the topic logically.
      
      For slide types:
      - "title": Use for the opening slide with a clear presentation title
      - "bullets": Standard bullet point slide for general content
      - "split": Content on one side and image on the other
      - "quote": For testimonials or important quotations
      - "image-focus": When the visual should be the main focus with overlay text
      
      Return ONLY a valid JSON array of objects with the following structure for each slide:
      {
        "title": "Slide Title",
        "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
        "imagePrompt": "Description for image search",
        "slideType": "one of the slide types mentioned above"
      }`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean and sanitize the response
      let jsonString = text;
      
      // Try to extract JSON if it's wrapped in markdown code blocks
      const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        jsonString = codeBlockMatch[1].trim();
      }
      
      // Remove any leading/trailing non-JSON characters
      jsonString = jsonString.trim();
      if (jsonString.startsWith('[') && jsonString.endsWith(']')) {
        try {
          const parsedContent = JSON.parse(jsonString);
          
          // Ensure each slide has the required fields and validate/assign slide types
          return parsedContent.map((slide, index) => {
            // Determine the slide type from the response or assign default based on position
            let slideType: "title" | "bullets" | "split" | "quote" | "image-focus" = "bullets";
            
            if (slide.slideType) {
              // Validate the slide type from the API response
              const validTypes = ["title", "bullets", "split", "quote", "image-focus"];
              if (validTypes.includes(slide.slideType)) {
                slideType = slide.slideType as any;
              }
            } else {
              // Fallback assignment based on position if no type provided
              if (index === 0) {
                slideType = "title";
              } else if (index % 3 === 0) {
                slideType = "split";
              } else if (index % 4 === 0) {
                slideType = "image-focus";
              }
            }
            
            // Override: First slide should always be title type
            if (index === 0) {
              slideType = "title";
            }
            
            return {
              title: slide.title || `Slide ${index + 1}`,
              content: Array.isArray(slide.content) ? slide.content : [],
              imagePrompt: slide.imagePrompt || slide.title,
              slideType: slideType
            };
          });
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          // If standard parsing fails, try a more lenient approach
          try {
            // Handle potential trailing commas by replacing them
            const fixedJson = jsonString
              .replace(/,\s*}/g, '}')
              .replace(/,\s*\]/g, ']');
            
            const parsedContent = JSON.parse(fixedJson);
            
            return parsedContent.map((slide, index) => {
              // Same slide type determination logic as above
              let slideType: "title" | "bullets" | "split" | "quote" | "image-focus" = "bullets";
              
              if (slide.slideType) {
                const validTypes = ["title", "bullets", "split", "quote", "image-focus"];
                if (validTypes.includes(slide.slideType)) {
                  slideType = slide.slideType as any;
                }
              } else {
                // Fallback assignment
                if (index === 0) {
                  slideType = "title";
                } else if (index % 3 === 0) {
                  slideType = "split";
                } else if (index % 4 === 0) {
                  slideType = "image-focus";
                }
              }
              
              // Override: First slide should always be title type
              if (index === 0) {
                slideType = "title";
              }
              
              return {
                title: slide.title || `Slide ${index + 1}`,
                content: Array.isArray(slide.content) ? slide.content : [],
                imagePrompt: slide.imagePrompt || slide.title,
                slideType: slideType
              };
            });
          } catch (fallbackError) {
            console.error('Fallback parsing failed:', fallbackError);
            throw new Error('Could not parse JSON response');
          }
        }
      } else {
        // Manual parsing if JSON structure isn't obvious
        console.warn('Response does not appear to be standard JSON:', jsonString);
        throw new Error('Invalid JSON structure from Gemini');
      }
    } catch (error) {
      console.error('Error generating presentation content:', error);
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
