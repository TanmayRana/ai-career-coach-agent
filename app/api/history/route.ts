import { db } from "@/configs/db";
import { chatHistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const { content, recordId, aiAgentType } = await req.json();
//   const user = await currentUser();
//   console.log("user", user);

//   try {
//     const result = await db.insert(chatHistoryTable).values({
//       recordId: recordId,
//       content: content,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       aiAgentType: aiAgentType,
//     });
//     console.log("tr");

//     return Response.json(
//       { message: "History saved successfully", result },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json({ error: "Failed to save history" }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { content, recordId, aiAgentType } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return Response.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!content || !recordId || !aiAgentType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.insert(chatHistoryTable).values({
      recordId,
      content,
      userEmail: user.primaryEmailAddress.emailAddress,
      aiAgentType,
    });

    return Response.json(
      { message: "History saved successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving history:", error);
    return Response.json(
      { error: "Failed to save history", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { content, recordId } = await req.json();
  try {
    const result = await db
      .update(chatHistoryTable)
      .set({
        content: content,
      })
      .where(eq(chatHistoryTable.recordId, recordId));
    return Response.json(
      { message: "History updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update history" },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const recordId = searchParams.get("recordId");
//     const user = await currentUser();

//     if (recordId) {
//       const result = await db
//         .select()
//         .from(chatHistoryTable)
//         .where(eq(chatHistoryTable.recordId, recordId));
//       return Response.json(result[0], { status: 200 });
//     } else {
//       const result = await db
//         .select()
//         .from(chatHistoryTable)
//         .where(
//           eq(
//             chatHistoryTable.userEmail,
//             user?.primaryEmailAddress?.emailAddress
//           )
//         );
//     }
//   } catch (error) {
//     console.error("[GET_HISTORY_ERROR]", error);
//     return Response.json({ error: "Failed to get history" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get("recordId");
    const user = await currentUser();

    if (recordId) {
      const result = await db
        .select()
        .from(chatHistoryTable)
        .where(eq(chatHistoryTable.recordId, recordId));
      return Response.json(result[0], { status: 200 });
    } else {
      const result = await db
        .select()
        .from(chatHistoryTable)
        .where(
          eq(
            chatHistoryTable.userEmail as any,
            user?.primaryEmailAddress?.emailAddress as any
          )
        )
        .orderBy(desc(chatHistoryTable.id));

      return Response.json(result, { status: 200 });
    }
  } catch (error) {
    console.error("[GET_HISTORY_ERROR]", error);
    return Response.json({ error: "Failed to get history" }, { status: 500 });
  }
}
