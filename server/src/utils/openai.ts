// import { BusinessProfile } from "../types";
// import { COMP_SYSTEM_PROMPT } from "../utils/prompt";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function recommendationsForBusinessProfile(
//   businessProfile: BusinessProfile
// ) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1", // Changed from "gpt-4.1" to valid model
//       messages: [
//         {
//           role: "system",
//           content: COMP_SYSTEM_PROMPT,
//         },
//         {
//           role: "user",
//           content: `Analyze this business profile and provide improvement recommendations based on competitor benchmarking:

//             ${JSON.stringify(businessProfile, null, 2)}

//             Please provide:
//             1. **Profile Strengths** - What this business does well
//             2. **Areas for Improvement** - Specific gaps compared to typical competitors
//             3. **Actionable Recommendations** - Concrete steps to improve visibility
//             4. **Priority Level** - Which improvements to tackle first

//             Focus on:
//             - Review count and rating optimization
//             - Photo quantity and quality
//             - Business information completeness
//             - Customer engagement opportunities
//             - Local search visibility factors

//             Format your response in markdown with clear sections and bullet points.`,
//         },
//       ],
//       max_tokens: 1500,
//       temperature: 0.7,
//     });

//     return response.choices[0].message;
//   } catch (error: any) {
//     if (error?.status === 429) {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }
//     console.error("Error occurred while summarizing text: ", error);
//     throw error; // Re-throw the error so it can be handled upstream
//   }
// }