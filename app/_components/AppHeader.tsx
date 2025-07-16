// import { SidebarTrigger } from '@/components/ui/sidebar'
// import { UserButton } from '@clerk/nextjs'
// import React from 'react'

// function AppHeader() {
//     return (
//         <div className='p-4 shadow-sm flex items-center justify-between w-full '>
//             <SidebarTrigger />
//             <div className='flex items-center gap-2'>
//                 <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
//             </div>
//         </div>
//     )
// }

// export default AppHeader

// import { SidebarTrigger } from '@/components/ui/sidebar'
// import { UserButton } from '@clerk/nextjs'
// import React from 'react'

// function AppHeader() {
//   return (
//     <div className="p-3 sm:p-4 shadow-sm flex items-center justify-between w-full">
//       <SidebarTrigger />
//       <div className="flex items-center gap-1 sm:gap-2">
//         <UserButton appearance={{ elements: { avatarBox: "w-7 h-7 sm:w-9 sm:h-9" } }} />
//       </div>
//     </div>
//   )
// }

// export default AppHeader

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function AppHeader() {
  return (
    <div className="p-3 sm:p-4 shadow-sm flex items-center justify-between w-full">
      <SidebarTrigger />
      <div className="flex items-center gap-1 sm:gap-2">
        <UserButton
          appearance={{ elements: { avatarBox: "w-7 h-7 sm:w-9 sm:h-9" } }}
        />
      </div>
    </div>
  );
}

export default AppHeader;
