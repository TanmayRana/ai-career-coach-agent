// import { auth } from "@clerk/nextjs/server";

// export async function GET(request: Request) {
//   try {
//     // const { plan } = await request.json();
//     const { has } = await auth();
//     console.log("has", has);

//     const hasPremiumAccess = has({ plan: "pro", plan: "premium" });
//     console.log("hasPremiumAccess", hasPremiumAccess);
//     return new Response(JSON.stringify({ hasAccess: hasPremiumAccess }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ hasAccess: false }), {
//       status: 200,
//     });
//   }
// }

import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  try {
    const { has } = await auth();

    const hasProAccess = has({ plan: "pro" });
    const hasPremiumAccess = has({ plan: "premium" });

    const hasAccess = hasProAccess || hasPremiumAccess;

    return new Response(JSON.stringify({ hasAccess }), {
      status: 200,
    });
  } catch (error) {
    console.error("Subscription check failed:", error);
    return new Response(JSON.stringify({ hasAccess: false }), {
      status: 200,
    });
  }
}
