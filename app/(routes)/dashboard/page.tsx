import React from "react";
import WelcomePage from "./_components/WelcomePage";
// import { auth } from "@clerk/nextjs/server";

async function Dashboard() {
  // const { has } = await auth();
  // console.log("has", has);

  // const hasPremiumAccess = has({ plan: "pro" });
  // console.log("hasPremiumAccess in dashboard", hasPremiumAccess);

  return (
    <div>
      <WelcomePage />
    </div>
  );
}

export default Dashboard;
