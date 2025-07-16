"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import ResumeUploadDialog from "./ResumeUploadDialog";
import { useState } from "react";
import RoadmapDialog from "./RoadmapDialog";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonClassName?: string;
  path: string;
  className?: string;
}

const ToolCard = ({
  title,
  description,
  icon,
  buttonText,
  path,
  buttonClassName,
  className,
}: ToolCardProps) => {
  const router = useRouter();
  const chatId = uuidv4();
  const [openResumeUploadDialog, setOpenResumeUploadDialog] = useState(false);
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);

  const handleClick = async () => {
    if (title === "AI Resume Analyzer") {
      setOpenResumeUploadDialog(true);
      return;
    }
    if (title === "Learning Roadmap") {
      setOpenRoadmapDialog(true);
      return;
    }

    const res = await axios.post("/api/history", {
      recordId: chatId,
      content: [],
      aiAgentType: path,
    });
    router.push(`${path}/${chatId}`);
  };

  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col items-center text-center space-y-5">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 to-purple-200 shadow-inner transform transition-transform duration-300 hover:scale-105">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
        <div className="space-y-2 px-2">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        <Button
          variant="secondary"
          className={cn(
            "w-full mt-4 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md rounded-md transition-all duration-200",
            buttonClassName
          )}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
        <ResumeUploadDialog
          open={openResumeUploadDialog}
          onOpenChange={setOpenResumeUploadDialog}
        />
        <RoadmapDialog
          open={openRoadmapDialog}
          onOpenChange={setOpenRoadmapDialog}
        />
      </div>
    </Card>
  );
};

export default ToolCard;

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// import ResumeUploadDialog from "./ResumeUploadDialog";
// import RoadmapDialog from "./RoadmapDialog";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// interface ToolCardProps {
//   title: string;
//   description: string;
//   icon: string;
//   buttonText: string;
//   buttonClassName?: string;
//   path: string;
//   className?: string;
// }

// const ToolCard = ({
//   title,
//   description,
//   icon,
//   buttonText,
//   path,
//   buttonClassName,
//   className,
// }: ToolCardProps) => {
//   const router = useRouter();
//   const chatId = uuidv4();

//   const [openResumeUploadDialog, setOpenResumeUploadDialog] = useState(false);
//   const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     if (title === "AI Resume Analyzer") {
//       setOpenResumeUploadDialog(true);
//       return;
//     }

//     if (title === "Learning Roadmap") {
//       setOpenRoadmapDialog(true);
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post("/api/history", {
//         recordId: chatId,
//         content: [],
//         aiAgentType: path,
//       });

//       router.push(`${path}/${chatId}`);
//     } catch (error) {
//       console.error("Failed to create chat history:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card
//       className={cn(
//         "p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300",
//         className
//       )}
//     >
//       <div className="flex flex-col items-center text-center space-y-5">
//         <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 to-purple-200 shadow-inner transform transition-transform duration-300 hover:scale-105">
//           <img src={icon} alt={title} className="w-12 h-12 object-contain" />
//         </div>

//         <div className="space-y-2 px-2">
//           <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
//         </div>

//         <Button
//           variant="secondary"
//           disabled={loading}
//           className={cn(
//             "w-full mt-4 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md rounded-md transition-all duration-200",
//             buttonClassName
//           )}
//           onClick={handleClick}
//         >
//           {loading ? "Loading..." : buttonText}
//         </Button>

//         <ResumeUploadDialog
//           open={openResumeUploadDialog}
//           onOpenChange={setOpenResumeUploadDialog}
//         />

//         <RoadmapDialog
//           open={openRoadmapDialog}
//           onOpenChange={setOpenRoadmapDialog}
//         />
//       </div>
//     </Card>
//   );
// };

// export default ToolCard;
