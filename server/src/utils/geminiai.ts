// import { BusinessProfile } from "../types"
// import { COMP_SYSTEM_PROMPT } from "./prompt"
// import {GoogleGenAI } from "@google/genai"

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_API_KEY,
    
//  }) 

// export const recommendationsForBusinessProfileGem = async (businessProfile: BusinessProfile) => {
//     try {
//        const res = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents:[
//             {
//                 role: "user", 
//                 parts: [
//                     {text: COMP_SYSTEM_PROMPT},
//                     {text: `Analyze this business profile and provide improvement recommendations based on competitor benchmarking:

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

//             Format your response in markdown with clear sections and bullet points.`,}
//                 ]
//             }
//         ],
//         config: {
//             temperature: 0.7,
//             maxOutputTokens: 1500,
//         }
//        })

//        if (!res.text) {
//         throw new Error("No summary generated from Gemini API (empty response)");
//        }
//        console.log(res.text);
//        return res.text;
//     } catch (error) {
//         console.error("Error occurred while summarizing text: ", error);
//         throw error
//     }
// }