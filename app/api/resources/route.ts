import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // or Gemini SDK if you prefer
});

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";

async function fetchYoutubeVideos(query: string) {
  const url = `${YOUTUBE_API}?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&maxResults=7&videoEmbeddable=true&safeSearch=strict&key=${
    process.env.YOUTUBE_API_KEY
  }`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((item: any) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    summary: item.snippet.description, // placeholder, LLM will refine
  }));
}

export async function POST(req: Request) {
  const { query } = await req.json();

  // Step 1: Fetch YouTube videos
  const youtubeVideos = await fetchYoutubeVideos(query);

  // Step 2: Build resources & frameworks (static, can expand later)
  const onlineResources = [
    {
      title: "LangChain Documentation",
      link: "https://docs.langchain.com",
      summary: "Official docs for LangChain, a popular LLM agent framework.",
    },
    {
      title: "Hugging Face Agents",
      link: "https://huggingface.co/docs/transformers/agents",
      summary: "Guide to Hugging Face’s agent ecosystem and tool use.",
    },
    {
      title: "OpenAI Assistants API",
      link: "https://platform.openai.com/docs/assistants",
      summary:
        "Docs for building multi-turn AI assistants with tools & memory.",
    },
    {
      title: "CrewAI Framework",
      link: "https://docs.crewai.com",
      summary: "Framework for orchestrating AI agent teams.",
    },
    {
      title: "Semantic Kernel",
      link: "https://learn.microsoft.com/en-us/semantic-kernel/",
      summary: "Microsoft’s SDK for building AI agents with orchestration.",
    },
  ];

  const frameworks = [
    { name: "LangChain", link: "https://docs.langchain.com" },
    { name: "CrewAI", link: "https://docs.crewai.com" },
    { name: "AutoGen", link: "https://microsoft.github.io/autogen/" },
    {
      name: "Semantic Kernel",
      link: "https://learn.microsoft.com/en-us/semantic-kernel/",
    },
    { name: "Haystack Agents", link: "https://haystack.deepset.ai/agents" },
  ];

  const useCases = [
    {
      title: "AI Tutors",
      description:
        "Agents that personalize learning by answering questions and generating exercises.",
    },
    {
      title: "Research Assistants",
      description:
        "Autonomous agents that read papers, extract insights, and summarize findings.",
    },
    {
      title: "Customer Support",
      description:
        "Agents that integrate with CRMs to resolve customer issues automatically.",
    },
    {
      title: "Workflow Automation",
      description:
        "Multi-agent setups that handle scheduling, reporting, and notifications.",
    },
    {
      title: "Code Generation & Debugging",
      description:
        "AI agents that write, test, and fix code based on developer instructions.",
    },
  ];

  const systemPrompt = `
You are a summarizer. Take the YouTube metadata and return JSON with better summaries.
Schema:
{
  "youtubeVideos": [ { "title": "string", "url": "string", "summary": "string" } ]
}
Return JSON only.
`;

  const userPrompt = JSON.stringify(youtubeVideos);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or gemini-2.0-flash
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const summarized = JSON.parse(completion.choices[0].message.content || "{}");

  return NextResponse.json({
    youtubeVideos: summarized.youtubeVideos || [],
    onlineResources,
    frameworks,
    useCases,
  });
}

// https://chatgpt.com/share/68a0927a-1d40-8003-882e-3f9af92593eb
