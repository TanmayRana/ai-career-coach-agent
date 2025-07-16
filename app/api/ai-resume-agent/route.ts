import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file: any = formData.get("file");
    const recordId = formData.get("recordId");

    const user = await currentUser();

    // Load PDF using WebPDFLoader
    const loader = new WebPDFLoader(file);
    const docs = await loader.load();
    // console.log("docs", docs[0]);

    // Convert file to base64 if needed (optional)
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Send event to Inngest with userInput and possibly docs or recordId
    const response = await inngest.send({
      name: "ai-resume-agent",
      data: {
        recordId: recordId,
        base64resumeFile: base64,
        pdfText: docs[0].pageContent,
        aiAgentType: "/ai_tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = response.ids[0];
    if (!runId) {
      return new Response("Failed to start Inngest run", { status: 500 });
    }

    let runStatus;

    // Poll for run status until completed
    while (true) {
      runStatus = await getRunStatus(runId);
      // console.log("runStatus", runStatus);
      const status = runStatus[0]?.status;
      if (status === "Completed") {
        break;
      }
      // Optional: Add timeout or max retry count to avoid infinite loop
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // console.log("runStatus", runStatus);

    // Return the output of the completed run
    return NextResponse.json(runStatus[0]?.output ?? {});
  } catch (err) {
    console.error("Error in POST /api:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function getRunStatus(runId: string) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch run status:", response.statusText);
    throw new Error(`Failed to fetch run status: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}
