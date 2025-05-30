import { recommendationsForBusinessProfileGem } from "../lib/geminiai";
import { recommendationsForBusinessProfile } from "../lib/openai";
import { BusinessProfile } from "../types";

export class AiService {
  private static instance: AiService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  public async generateResponse(profile: BusinessProfile) {
    // Simulate an AI response generation
    let aiResponse = null;
    try {
      aiResponse = await recommendationsForBusinessProfile(profile);
    } catch (error) {
      console.error("Error generating AI response with Openai:", error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          aiResponse = await recommendationsForBusinessProfileGem(profile);
        } catch (geminiError) {
          console.error(
            "Gemini API failer after openai quota exceeded",
            geminiError
          );
          throw new Error("Gemini API failed");
        }
      }
    }
    return aiResponse;
  }
}
