import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { BusinessProfile } from "../types";
import { COMP_SYSTEM_PROMPT } from "../utils/prompt";

export class AiService {
  private static instance: AiService;
  private openai: OpenAI | null = null;
  private gemini: GoogleGenAI | null = null;

  private constructor() {
    // Initialize clients only when needed
  }

  public static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  private getOpenAIClient(): OpenAI {
    if (!this.openai) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable is missing");
      }
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return this.openai;
  }

  private getGeminiClient(): GoogleGenAI {
    if (!this.gemini) {
      if (!process.env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY environment variable is missing");
      }
      this.gemini = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY,
      });
    }
    return this.gemini;
  }

  private async generateWithOpenAI(businessProfile: BusinessProfile) {
    try {
      const openai = this.getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4.1", // Fixed model name
        messages: [
          {
            role: "system",
            content: COMP_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Analyze this business profile and provide improvement recommendations based on competitor benchmarking:

              ${JSON.stringify(businessProfile, null, 2)}

              Please provide:
              1. **Profile Strengths** - What this business does well
              2. **Areas for Improvement** - Specific gaps compared to typical competitors
              3. **Actionable Recommendations** - Concrete steps to improve visibility
              4. **Priority Level** - Which improvements to tackle first

              Focus on:
              - Review count and rating optimization
              - Photo quantity and quality
              - Business information completeness
              - Customer engagement opportunities
              - Local search visibility factors

              Format your response in markdown with clear sections and bullet points.`,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error: any) {
      if (error?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
      console.error("Error occurred with OpenAI:", error);
      throw error;
    }
  }

  private async generateWithGemini(businessProfile: BusinessProfile) {
    try {
      const gemini = this.getGeminiClient();
      const res = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: COMP_SYSTEM_PROMPT },
              {
                text: `Analyze this business profile and provide improvement recommendations based on competitor benchmarking:

                ${JSON.stringify(businessProfile, null, 2)}

                Please provide:
                1. **Profile Strengths** - What this business does well
                2. **Areas for Improvement** - Specific gaps compared to typical competitors
                3. **Actionable Recommendations** - Concrete steps to improve visibility
                4. **Priority Level** - Which improvements to tackle first

                Focus on:
                - Review count and rating optimization
                - Photo quantity and quality
                - Business information completeness
                - Customer engagement opportunities
                - Local search visibility factors

                Format your response in markdown with clear sections and bullet points.`,
              },
            ],
          },
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      });

      if (!res.text) {
        throw new Error(
          "No summary generated from Gemini API (empty response)"
        );
      }

      return res.text;
    } catch (error) {
      console.error("Error occurred with Gemini:", error);
      throw error;
    }
  }

  public async generateResponse(profile: BusinessProfile): Promise<string> {
    try {
      // Try OpenAI first
      const response = await this.generateWithOpenAI(profile);
      return response || "No response generated";
    } catch (error) {
      console.error("Error generating AI response with OpenAI:", error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          console.log("OpenAI rate limit exceeded, trying Gemini...");
          const response = await this.generateWithGemini(profile);
          return response;
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quota exceeded:",
            geminiError
          );
          throw new Error("Both AI services failed to generate response");
        }
      }

      throw error;
    }
  }

  private async compareWithOpenAI(
    businessProfile: BusinessProfile,
    competitors: BusinessProfile[]
  ) {
    const prompt = `Compare this business with its selected competitors:

        TARGET BUSINESS:
        ${JSON.stringify(businessProfile, null, 2)}

        SELECTED COMPETITORS:
        ${JSON.stringify(competitors, null, 2)}

        Provide a detailed comparison analysis focusing on:
        1. **Competitive Positioning** - How does the target business rank vs competitors
        2. **Key Differentiators** - What makes each business unique
        3. **Improvement Opportunities** - Specific areas where the target can improve
        4. **Strategic Recommendations** - Actionable steps based on competitor analysis

        Format your response in markdown with clear sections.`;
    try {
      const openai = this.getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4.1", // Fixed model name
        messages: [
          {
            role: "system",
            content: COMP_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error: any) {
      if (error?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
      console.error("Error occurred with OpenAI:", error);
      throw error;
    }
  }

  private async compareWithGemini(
    businessProfile: BusinessProfile,
    competitors: BusinessProfile[]
  ) {
    const prompt = `Compare this business with its selected competitors:

        TARGET BUSINESS:
        ${JSON.stringify(businessProfile, null, 2)}

        SELECTED COMPETITORS:
        ${JSON.stringify(competitors, null, 2)}

        Provide a detailed comparison analysis focusing on:
        1. **Competitive Positioning** - How does the target business rank vs competitors
        2. **Key Differentiators** - What makes each business unique
        3. **Improvement Opportunities** - Specific areas where the target can improve
        4. **Strategic Recommendations** - Actionable steps based on competitor analysis

        Format your response in markdown with clear sections.`;
    try {
      const gemini = this.getGeminiClient();
      const res = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: COMP_SYSTEM_PROMPT },
              {
                text: prompt,
              },
            ],
          },
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      });

      if (!res.text) {
        throw new Error(
          "No summary generated from Gemini API (empty response)"
        );
      }

      return res.text;
    } catch (error) {
      console.error("Error occurred with Gemini:", error);
      throw error;
    }
  }

  public async generateComparisonResponse(business: BusinessProfile, competitors: BusinessProfile[]) {
    try {
      // Try OpenAI first
      const response = await this.compareWithOpenAI(business, competitors);
      return response || "No response generated";
    } catch (error) {
      console.error("Error generating AI compare response with OpenAI:", error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          console.log("OpenAI rate limit exceeded, trying Gemini...");
          const response = await this.compareWithGemini(business, competitors);
          return response;
        } catch (geminiError) {
          console.error(
            "Gemini API compare failed after OpenAI quota exceeded:",
            geminiError
          );
          throw new Error("Both AI services failed to generate response");
        }
      }

      throw error;
    }
  }
}
