// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// const RoadmapDialog = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: (open: boolean) => void;
// }) => {
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={onClose}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
//             <DialogDescription>
//               <div className="">
//                 <Input placeholder="e.g Javascript, React, Node.js" />
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RoadmapDialog;

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// const RoadmapDialog = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: (open: boolean) => void;
// }) => {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-gray-900">
//             Enter Position/Skills to Generate Roadmap
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4">
//           <Input
//             placeholder="e.g. Javascript, React, Node.js"
//             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//           />
//         </div>

//         <div className="mt-6 flex justify-end space-x-3">
//           <Button
//             variant="outline"
//             onClick={() => onClose(false)}
//             className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               // Add your submit handler here
//               onClose(false);
//             }}
//             className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             Generate
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoadmapDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import axios from "axios";
// // import { useParams } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// const RoadmapDialog = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: (open: boolean) => void;
// }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const roadmapId = uuidv4();
//   const handleGenerate = async () => {
//     setIsLoading(true);
//     try {
//       // Simulate async operation (e.g., API call)
//       const res = await axios.post("/api/ai-roadmap-agent", {
//         roadmapId: roadmapId,
//         userInput: inputValue,
//       });
//       onClose(false);
//     } catch (error) {
//       // Handle error if needed
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-gray-900">
//             Enter Position/Skills to Generate Roadmap
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4">
//           <Input
//             placeholder="e.g. Javascript, React, Node.js"
//             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>

//         <div className="mt-6 flex justify-end space-x-3">
//           <Button
//             variant="outline"
//             onClick={() => onClose(false)}
//             disabled={isLoading}
//             className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleGenerate}
//             disabled={isLoading || !inputValue.trim()}
//             className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center ${
//               isLoading ? "cursor-not-allowed opacity-70" : ""
//             }`}
//           >
//             {isLoading ? (
//               <LoaderCircle className="animate-spin h-5 w-5 text-white" />
//             ) : (
//               "Generate"
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoadmapDialog;

// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// interface RoadmapDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const RoadmapDialog = ({ open, onOpenChange }: RoadmapDialogProps) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleGenerate = async () => {
//     setIsLoading(true);
//     setError("");
//     const roadmapId = uuidv4();

//     try {
//       const res = await axios.post("/api/ai-roadmap-agent", {
//         roadmapId,
//         userInput: inputValue.trim(),
//       });
//       console.log("res fron roadmap ", res.data);

//       onOpenChange(false);
//       // router.push(`/Learning Roadmap/${roadmapId}`);
//     } catch (err) {
//       setError("Failed to generate roadmap. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-gray-900">
//             Enter Position/Skills to Generate Roadmap
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4">
//           <Input
//             placeholder="e.g. Javascript, React, Node.js"
//             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

//         <div className="mt-6 flex justify-end space-x-3">
//           <Button
//             variant="outline"
//             onClick={() => onOpenChange(false)}
//             disabled={isLoading}
//             className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleGenerate}
//             disabled={isLoading || !inputValue.trim()}
//             className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center ${
//               isLoading ? "cursor-not-allowed opacity-70" : ""
//             }`}
//           >
//             {isLoading ? (
//               <LoaderCircle className="animate-spin h-5 w-5 text-white" />
//             ) : (
//               "Generate"
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoadmapDialog;

// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// interface RoadmapDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const RoadmapDialog = ({ open, onOpenChange }: RoadmapDialogProps) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleGenerate = async () => {
//     if (!inputValue.trim()) return;

//     setIsLoading(true);
//     setError("");
//     const roadmapId = uuidv4();

//     try {
//       const res = await axios.post("/api/ai-roadmap-agent", {
//         roadmapId,
//         userInput: inputValue.trim(),
//       });
//       console.log("Response from roadmap API:", res.data);

//       onOpenChange(false);
//       setInputValue("");
//       // Navigate to the roadmap page - avoid spaces in URL
//       // router.push(`/learning-roadmap/${roadmapId}`);
//     } catch (err: any) {
//       console.error(err);
//       setError(
//         err?.response?.data?.message ||
//           "Failed to generate roadmap. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//       // onOpenChange(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-gray-900">
//             Enter Position/Skills to Generate Roadmap
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4">
//           <Input
//             placeholder="e.g. Javascript, React, Node.js"
//             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             disabled={isLoading}
//             aria-label="Enter skills or position"
//           />
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

//         <div className="mt-6 flex justify-end space-x-3">
//           <Button
//             variant="outline"
//             onClick={() => onOpenChange(false)}
//             disabled={isLoading}
//             className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleGenerate}
//             disabled={isLoading || !inputValue.trim()}
//             className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center ${
//               isLoading ? "cursor-not-allowed opacity-70" : ""
//             }`}
//             aria-disabled={isLoading || !inputValue.trim()}
//           >
//             {isLoading ? (
//               <LoaderCircle className="animate-spin h-5 w-5 text-white" />
//             ) : (
//               "Generate"
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoadmapDialog;

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// // import { useAuth } from "@clerk/nextjs";

// interface RoadmapDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const RoadmapDialog = ({ open, onOpenChange }: RoadmapDialogProps) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   // ✅ Reset input when dialog closes
//   useEffect(() => {
//     if (!open) {
//       setInputValue("");
//       setError("");
//     }
//   }, [open]);

//   const hasSubscription = async (): Promise<boolean> => {
//     try {
//       const res = await axios.get("/api/check-subscription");
//       return res.data?.hasAccess ?? false;
//     } catch (error) {
//       console.error("Error checking subscription:", error);
//       return false;
//     }
//   };

//   const resetState = () => {
//     setInputValue("");
//     setError("");
//     setIsLoading(false);
//   };

//   const handleGenerate = async () => {
//     if (!inputValue.trim()) return;

//     setIsLoading(true);
//     setError("");
//     const roadmapId = uuidv4();
//     // const { has } = useAuth();

//     try {
//       const hasSubscriptionEnabled = await hasSubscription();

//       if (!hasSubscriptionEnabled) {
//         const resultHistory = await axios.get("/api/history");
//         const historyList = resultHistory.data;

//         const isPresent = historyList.find(
//           (item: any) => item.aiAgentType === "/ai_tools/ai-roadmap-agent"
//         );

//         console.log("isPresent", isPresent);

//         if (isPresent) {
//           router.push("/billing");
//           resetState();
//           return;
//         }
//       }

//       const res = await axios.post("/api/ai-roadmap-agent", {
//         roadmapId,
//         userInput: inputValue.trim(),
//       });
//       console.log("Response from roadmap API:", res.data);

//       onOpenChange(false);
//       router.push(`/ai_tools/ai-roadmap-agent/${roadmapId}`);
//     } catch (err: any) {
//       console.error(err);
//       setError(
//         err?.response?.data?.message ||
//           "Failed to generate roadmap. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold text-gray-900">
//             Enter Position/Skills to Generate Roadmap
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4">
//           <Input
//             placeholder="e.g. Javascript, React, Node.js"
//             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             disabled={isLoading}
//             aria-label="Enter skills or position"
//           />
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

//         <div className="mt-6 flex justify-end space-x-3">
//           <Button
//             variant="outline"
//             onClick={() => onOpenChange(false)}
//             disabled={isLoading}
//             className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleGenerate}
//             disabled={isLoading || !inputValue.trim()}
//             className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center ${
//               isLoading ? "cursor-not-allowed opacity-70" : ""
//             }`}
//             aria-disabled={isLoading || !inputValue.trim()}
//           >
//             {isLoading ? (
//               <LoaderCircle className="animate-spin h-5 w-5 text-white" />
//             ) : (
//               "Generate"
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoadmapDialog;

"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner"; // Optional toast support

interface RoadmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoadmapDialog = ({ open, onOpenChange }: RoadmapDialogProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setError("");
    }
  }, [open]);

  const hasSubscription = async (): Promise<boolean> => {
    try {
      const res = await axios.get("/api/check-subscription");
      return res.data?.hasAccess ?? false;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  const resetState = () => {
    setInputValue("");
    setError("");
    setIsLoading(false);
  };

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setError("");
    const roadmapId = uuidv4();

    try {
      const hasSubscriptionEnabled = await hasSubscription();

      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get("/api/history");
        const historyList = resultHistory.data;

        const isPresent = historyList.find(
          (item: any) => item.aiAgentType === "/ai_tools/ai-roadmap-agent"
        );

        if (isPresent) {
          toast.warning(
            "You've used your free roadmap. Upgrade for unlimited access."
          );
          router.push("/billing");
          resetState();
          return;
        }
      }

      const res = await axios.post("/api/ai-roadmap-agent", {
        roadmapId,
        userInput: inputValue.trim(),
      });

      toast.success("Roadmap generated successfully!");
      // console.log("Navigating to:", `/ai_tools/ai-roadmap-agent/${roadmapId}`);
      onOpenChange(false);
      router.push(`/ai_tools/ai-roadmap-agent/${roadmapId}`);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        "Failed to generate roadmap. Please try again.";
      toast.error(msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg p-6 bg-white shadow-lg animate-fadeIn">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Enter Position/Skills to Generate Roadmap
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Input
            placeholder="e.g. Javascript, React, Node.js"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            aria-label="Enter skills or position"
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !inputValue.trim()}
            className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
            aria-disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapDialog;
