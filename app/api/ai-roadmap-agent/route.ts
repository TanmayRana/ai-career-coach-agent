import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { roadmapId, userInput } = await req.json();
  const user = await currentUser();
  try {
    const response = await inngest.send({
      name: "ai-roadmap-agent",
      data: {
        roadmapId: roadmapId,
        userInput: userInput,
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
      if (status === "Cancelled") {
        break;
      }
      // Optional: Add timeout or max retry count to avoid infinite loop
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // console.log("runStatus", runStatus);

    // Return the output of the completed run
    return Response.json(runStatus[0]?.output ?? {});
  } catch (error) {}
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
