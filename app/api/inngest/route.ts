import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  aiCareerAgent,
  aiResumeUploadFunction,
  aiRoadmapFunction,
  helloWorld,
} from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    aiCareerAgent,
    aiResumeUploadFunction,
    aiRoadmapFunction,
  ],
});
