import { chatHistoryTable } from "@/configs/schema";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { db } from "@/configs/db";

// Define helloWorld function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Create AI career chat agent
const aiCareerChatAgent = createAgent({
  name: "ai-career-chat-agent",
  description: "A chat agent that answers questions about careers.",
  system: `You are a helpful, professional AI Career Coach Agent. Your role is to guide users with questions related to careers, including job search advice, interview preparation, resume improvement, skill development, career transitions, and industry trends. Always respond with clarity, encouragement, and actionable advice tailored to the user's needs.
  If the user asks something unrelated to careers (e.g., topics like health, relationships, coding help, or general trivia), gently inform them that you are a career coach and suggest relevant career-focused questions instead.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || "",
  }),
});

// Function to handle AI career chat events
export const aiCareerAgent = inngest.createFunction(
  { id: "aicareerchat" },
  { event: "aicareerchat" },
  async ({ event, step }) => {
    // console.log("Received event:", event.data);

    const userInput = event?.data.userInput;
    if (!userInput) {
      throw new Error("Missing userInput in event data.");
    }

    try {
      const response = await aiCareerChatAgent.run(userInput);
      return response;
    } catch (error) {
      console.error("Error processing AI career chat:", error);
      throw new Error("Failed to process AI career chat.");
    }
  }
);

// Create AI resume agent

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL!,
});

export const aiResumeAgent = createAgent({
  name: "ai-resume-agent",
  description: "A agent that Analzye Resume and return Report",
  system: `You are an advanced Al Resume Analyzer Agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual Ul that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.
INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:
overall_score (0-100)
overall_feedback (short message e.g., "Excellent", "Needs improvement")
summary_comment (1-2 sentence evaluation summary)
Section scores for:
Contact Info
Experience
Education
Skills
Each section should include:
score (as percentage)
Optional comment about that section
Tips for improvement (3-5 tips)
What's Good (1-3 strengths)
Needs Improvement (1-3 weaknesses)
Output JSON Schema:
json
Copy
Edit
{
"overall_score": 85,
"overall_feedback": "Excellent!",
"summary_comment": "Your resume is strong, but there are areas to refine.",
"sections": {
"contact_info": {
"score": 95,
"comment": "Perfectly structured and complete."
},
"experience": {
"score": 88,
"comment": "Strong bullet points and impact."
},
"education": {
"score": 70,
"comment": "Consider adding relevant coursework."
"skills": {
"score": 60,
"comment": "Expand on specific skill proficiencies."
}
},
"tips_for_improvement": [
"Add more numbers and metrics to your experience section to show impact.", "Integrate more industry-specific keywords relevant to your target roles.",
"Start bullet points with strong action verbs to make your achievements stand out."
"whats_good": [
"Clean and professional formatting.",
"Clear and concise contact information.",
"Relevant work experience."
"needs_improvement": [
"Skills section lacks detail.",
"Some experience bullet points could be stronger.",
"Missing a professional summary/objective."
]}
`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || "",
  }),
});

export const aiResumeUploadFunction = inngest.createFunction(
  { id: "ai-resume-agent" },
  { event: "ai-resume-agent" },
  async ({ event, step }) => {
    const { recordId, base64resumeFile, pdfText, aiAgentType, userEmail } =
      event.data;

    try {
      const uploadResponse = await step.run("upload-resume-file", async () => {
        const imagekitResponse = await imagekit.upload({
          file: base64resumeFile,
          fileName: `${recordId}.pdf`,
          isPublished: true,
        });

        return imagekitResponse.url;
      });

      const aiResumeAgentResponse = await aiResumeAgent.run(pdfText);
      // console.log("aiResumeAgentResponse", aiResumeAgentResponse);

      // @ts-ignore
      const raw = aiResumeAgentResponse?.output[0]?.content;

      const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
      const jsonString = match ? match[1] : raw.trim();
      const json = JSON.parse(jsonString);

      const savetodb = await step.run("save-to-db", async () => {
        const result = await db.insert(chatHistoryTable).values({
          recordId: recordId,
          content: json,
          userEmail: userEmail,
          aiAgentType: aiAgentType,
          createdAt: new Date(),
          metaData: uploadResponse,
        });

        // console.log("result from db", result);
      });

      return json;
    } catch (error) {
      console.error("Error uploading resume to ImageKit:", error);
      throw error;
    }
  }
);

// TODO: create Roadmap Agent

export const aiRoadmapAgent = createAgent({
  name: "ai-roadmap-agent",
  description: "An agent that generates a detailed tree-like flow roadmap",
  system: `
Generate a spacious, tree-structured learning roadmap for a React Flow diagram in JSON format.

Requirements:
- The layout should resemble the vertical structure of roadmap.sh.
- Each step should progress from fundamentals (top) to advanced topics (bottom).
- Include branches for specializations where applicable (e.g., testing, performance, deployment).
- Each node must contain:
  - A unique "id"
  - A fixed "type": "turbo"
  - "position": with meaningful and spaced-out x/y coordinates. Maintain vertical flow with y-incremented values (e.g., y += 250). Use different x-coordinates (e.g., -400, 0, 400) to separate branches.
  - "data" object with:
    - "title": A concise name for the step.
    - "description": A short two-line explanation of what the step covers.
    - "link": A relevant and high-quality learning resource (official docs, articles, or tutorials).
    - "color": A hex color code for the node's background color.
- Nodes should be well-spaced for clarity (suggested spacing: y += 250-300 between levels, x ± 400 for branches).
- Also generate a list of unique "edges", where each edge includes:
  - "id"
  - "source" (source node ID)
  - "target" (target node ID)

Format the entire response as a single JSON object like:
{
  "roadmapTitle": "[Your Roadmap Title Here]",
  "description": "[3-5 lines summarizing the roadmap's scope, goals, and intended audience.]",
  "duration": "[Estimated completion time, e.g., '6-12 Months', 'Ongoing']",
  "initialNodes": [
    // nodes go here
  ],
  "initialEdges": [
    // edges go here
  ]
}
`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || "",
  }),
});

const aifinderAgent = createAgent({
  name: "aifinder-agent",
  description: "Finds the best and most up-to-date resources for user query",
  system: `
You are a research assistant specializing in AI and ML.

The user will provide a query (e.g., "AI agents for education"). Use that query as context to find relevant learning resources.

Your ONLY output must be valid JSON in the following structure (no extra text, no markdown, no code fences):

{
  "youtubeVideos": [
    { "title": "string", "url": "string", "summary": "string" }
  ],
  "onlineResources": [
    { "title": "string", "link": "string", "summary": "string" }
  ],
  "frameworks": [
    { "name": "string", "link": "string" }
  ],
  "useCases": [
    { "title": "string", "description": "string" }
  ]
}

Hard rules (must all be followed):
- Output must be valid JSON (double quotes, no trailing commas) and parseable by JSON.parse().
- Always tailor all items to the user’s query intent and domain.
- youtubeVideos.length >= 5 and onlineResources.length >= 5.
- If you cannot find enough items for a category, return "[]".
- Do not invent extra keys; only the four keys above are allowed.
- Summaries must be one concise sentence each.

YouTube strict requirements:
- Only include canonical watch URLs in the form: "https://www.youtube.com/watch?v=VIDEO_ID".
- Never invent or guess video IDs. Only include videos from well-established, reputable channels (e.g., Google, Microsoft, DeepLearning.AI, Hugging Face, LangChain, OpenAI, Stanford, MIT, Harvard, top educators).
- Prefer videos uploaded in the last 24 months.
- Exclude anything unavailable, private, removed, age-restricted, or requiring sign-in.
- If you cannot confidently return 5+ valid, available videos, expand the query or reduce to fewer but fully valid items.

Online resources requirements:
- Each "link" must be a reachable (HTTP 200) public resource, not behind a paywall or login.
- Prefer official docs, reputable blogs, and courses (e.g., langchain.com, huggingface.co, developers.google.com, openai.com, coursera.org, datacamp.com, arXiv).
- Summaries must clearly explain why the resource is useful.

Frameworks:
- Include major agent libraries with official docs (LangChain, CrewAI, AutoGen, OpenAI Assistants API, Semantic Kernel, Haystack, LlamaIndex, LangGraph).
- Use official links only.

Use cases:
- Provide 3–5 real-world agent applications tailored to the query.
- Each should be 1–2 sentences describing the problem solved and outcome.

Search & fallback strategy:
- Start with the exact user query.
- Expand with related terms (e.g., "AI agents", "autonomous agents", "tool-using LLM agents", "[domain] agents").
- For YouTube, prefer searches like: "[topic] tutorial", "[topic] crash course", "[topic] explained", "[topic] workshop", "[topic] lecture".
- If a video candidate is uncertain, discard it and try another query. Do not include broken or guessed links.

Final formatting checklist:
- JSON only, no prose or markdown.
- Keys spelled exactly as in the schema.
- At least 5 valid YouTube items and 5 valid online resources, unless truly impossible.
- No duplicate URLs. All links must start with "https://".

`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || "",
  }),
});

export const aiRoadmapFunction = inngest.createFunction(
  { id: "ai-roadmap-agent" },
  { event: "ai-roadmap-agent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = event.data;
    const roadmapResult = await aiRoadmapAgent.run(userInput);
    // @ts-ignore
    const raw = roadmapResult?.output[0]?.content;

    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();
    const roadmap = JSON.parse(jsonString);

    const resources = await step.run("find-online-resources", async () => {
      const aifinderAgentResponse = await aifinderAgent.run(userInput);
      const firstOutput = aifinderAgentResponse?.output[0];
      const raw =
        "content" in (firstOutput ?? {})
          ? (firstOutput as { content: string }).content
          : "";
      const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
      const jsonString = match ? match[1] : raw.trim();
      const json = JSON.parse(jsonString);
      return json;
    });

    const savetodb = await step.run("save-to-db-roadmap", async () => {
      const result = await db.insert(chatHistoryTable).values({
        recordId: roadmapId,
        // content: { json, resources: { resources } },
        content: { roadmap: roadmap, resources: resources },
        userEmail: userEmail,
        aiAgentType: "/ai_tools/ai-roadmap-agent",
        createdAt: new Date(),
        metaData: userInput,
      });
      return result;
    });

    return savetodb;
  }
);
