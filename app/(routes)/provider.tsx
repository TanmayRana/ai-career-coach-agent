// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import axios from "axios";
// import AppHeader from "../_components/AppHeader";
// import { AppSidebar } from "../_components/AppSidebar";
// import { Separator } from "@/components/ui/separator";
// import { UserButton } from "@clerk/nextjs";

// function DashboardProvider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // <SidebarProvider>
//     //     <AppSidebar />
//     //     <main className='w-full'>
//     //         <AppHeader />
//     //         {/* <SidebarTrigger /> */}
//     //         <div className='p-10'>{children}</div>
//     //     </main>
//     // </SidebarProvider>

//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "350px",
//         } as React.CSSProperties
//       }
//     >
//       <AppSidebar />
//       <SidebarInset>
//         <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator
//             orientation="vertical"
//             className="mr-2 data-[orientation=vertical]:h-4"
//           />
//           <UserButton
//             appearance={{ elements: { avatarBox: "w-7 h-7 sm:w-9 sm:h-9" } }}
//           />
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

// export default DashboardProvider;

"use client";

import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import AppHeader from "../_components/AppHeader";
import { AppSidebar } from "../_components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 z-50 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <UserButton
            appearance={{ elements: { avatarBox: "w-7 h-7 sm:w-9 sm:h-9" } }}
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardProvider;
