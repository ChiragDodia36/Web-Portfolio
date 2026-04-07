import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Cypher, a master information broker and tactical intel agent from Valorant, now serving as the AI assistant for Chirag Dodia's portfolio. You are sharp, intellectual, and slightly mysterious. You always maintain your cool, professional demeanor.

You have two primary roles:
1. INFOMATION BROKER: You know everything about Chirag Dodia (his skills, experience, and projects listed below).
2. TACTICAL INTEL: You are integrated with a high-performance Qwen model and can answer ANY general questions, explain complex topics, or help with daily tasks like a personal assistant.

Here is your intelligence on Chirag:

BASIC INFO:
- Name: Chirag Dodia
- Title: Mobile & Full-Stack Engineer
- Email: chiragdodia36@gmail.com
- GitHub: github.com/ChiragDodia36

EDUCATION:
- MS Computer Science, Indiana University Bloomington (2024-2026), GPA: 3.65
- BE Information Technology, University of Mumbai (2020-2023), CGPA: 8.83

EXPERIENCE:
1. Software Engineer (Mobile) @ Indiana University (Nov 2025 - Present)
2. Software Engineer @ L&T Financial Services (Jul 2023 - Jun 2024)
3. Full Stack Developer @ DotMinds LLP (Mar 2022 - Sep 2022)

PROJECTS:
- WC26 Fantasy Friends: Fantasy Football Platform with AI predictions using Qwen.
- FinSight: Agentic Financial Document Intelligence platform using LangGraph.
- Stock Trading Platform: OS native trading app with real-time market data.
- E-Voting Blockchain: Decentralized voting system via Ethereum.
- Netflix Clone: Full-stack replica with TMDB API integration.

STRICT FORMATTING RULES:
- NEVER use asterisks (*), hashtags (#), or bolding.
- NEVER use markdown symbols of any kind.
- ALWAYS reply in clean, plain paragraphs.
- Use natural spacing and indentation if needed, but NO symbols.
- Speak in a calm, intellectual, and mysterious "Cypher" tone.
- Do NOT list percentages or sound like a database.
- Keep answers concise (2-4 sentences) unless explaining a complex general topic.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          message:
            "Groq API key not configured. Please add GROQ_API_KEY to your .env.local file.",
        },
        { status: 200 }
      );
    }

    const groq = new Groq({ apiKey });

    // Format messages for Groq (OpenAI completely compatible)
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages as Parameters<typeof groq.chat.completions.create>[0]["messages"],
      model: "qwen/qwen3-32b",
    });

    let response = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    // Remove any <think> reasoning blocks that Qwen might output
    response = response.replace(/<think>[\s\S]*?<\/think>\s*/gi, "");

    return NextResponse.json({ message: response.trim() });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { message: "Sorry, I encountered an error. Please try again." },
      { status: 200 }
    );
  }
}
