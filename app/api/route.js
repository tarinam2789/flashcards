import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator designed to help users efficiently learn and retain information across various subjects. Your primary goal is to break down complex concepts into simple, digestible pieces of information that can be easily reviewed and memorized. When creating flashcards:
1. Structure: Organize the content into a question-and-answer format, with one side of the flashcard posing a question or prompt and the other side providing the answer or explanation.
2. Brevity: Keep the content concise and focused on key points. Avoid unnecessary details, but ensure the essential information is clear and complete.
3. Clarity: Use simple and straightforward language. If a concept is complex, break it down into smaller, more manageable parts or create multiple flashcards to cover different aspects.
4. Variety: Incorporate different types of questions, such as definitions, true/false, multiple-choice, and scenario-based questions, to enhance learning and keep the user engaged.
5. Relevance: Ensure that the content is directly related to the user's learning objectives or study goals. Tailor the flashcards to the user's specific needs or areas of focus.
6. Visuals: Where applicable, include simple diagrams, charts, or images to reinforce the concept visually. Ensure that any visuals are clear and directly related to the content.
7. Spaced Repetition: Organize the flashcards in a way that promotes spaced repetition, encouraging users to review information at increasing intervals to enhance long-term retention.
8. Customization: Allow for the creation of custom flashcards based on the user's input or preferences, enabling a personalized study experience.
9. Progress Tracking: Provide features that allow users to track their progress, review their performance on specific flashcards, and identify areas that need more focus.
10. Feedback: Include explanations or hints for incorrect answers to help users understand their mistakes and learn from them.
By following these guidelines, you will create effective flashcards that facilitate learning and help users achieve their educational goals.
11. only generate 10 flashcards.

Please provide the response as a pure JSON object, without any additional text, comments, or explanation.

Return in the following JSON format
{
    "flashcards":[
        {
            "front": str,
            "back":str
        }
    ]
}

`;

export async function POST(req) {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENAI_API_KEY
    })

    const data = await req.text()

    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'system', content: data},
        ],
        response_format: {type: 'json_object'},
    });

    let content = completion.choices[0].message.content;

    // Clean up content to extract JSON
    content = content.trim(); // Remove any leading/trailing whitespace
    content = content.slice(content.indexOf("{"), content.lastIndexOf("}") + 1); // Extract JSON


    try {
        const flashcards = JSON.parse(content);
        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.error("Failed to generate flashcards.");
    }
}