// import React, { useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// import { v4 as uuidv4 } from "uuid";

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const validateFile = (file: File) => {
//     if (file.type !== "application/pdf") {
//       return "Only PDF files are allowed.";
//     }
//     if (file.size > MAX_FILE_SIZE_BYTES) {
//       return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//     }
//     return "";
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }
//     // TODO: Implement upload logic here, e.g. upload to server or cloud storage
//     const recordId = uuidv4();
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("recordId", recordId);
//     console.log("formData", formData);

//     onOpenChange(false);
//     setSelectedFile(null);
//     setError("");
//   };

//   const handleCancel = () => {
//     setSelectedFile(null);
//     setError("");
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>Upload Resume PDF</DialogTitle>
//           <DialogDescription>
//             <div className="mb-4 text-sm text-gray-500">
//               Please upload your resume as a PDF file. Max size:{" "}
//               {MAX_FILE_SIZE_MB}
//               MB.
//             </div>

//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               className={`mb-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
//                 isDragging
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   fileInputRef.current?.click();
//                 }
//               }}
//               aria-label="File upload dropzone, click or drag and drop PDF file here"
//             >
//               <p className="text-gray-700 text-center">
//                 Drag & drop your PDF here, or click to select a file
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </div>

//             {selectedFile && (
//               <div className="text-green-600 text-sm mb-2" aria-live="polite">
//                 Selected file: <strong>{selectedFile.name}</strong> (
//                 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//               </div>
//             )}

//             {error && (
//               <div
//                 className="text-red-600 text-sm mb-2"
//                 role="alert"
//                 aria-live="assertive"
//               >
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-2 justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//                 onClick={handleCancel}
//                 type="button"
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//                 onClick={handleUpload}
//                 type="button"
//                 disabled={!selectedFile || !!error}
//               >
//                 Upload
//               </button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ResumeUploadDialog;

// import React, { useRef, useState, useCallback, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// // import { auth } from "@clerk/nextjs/server";
// import { useAuth } from "@clerk/nextjs";

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const validateFile = (file: File) => {
//   if (file.type !== "application/pdf") {
//     return "Only PDF files are allowed.";
//   }
//   if (file.size > MAX_FILE_SIZE_BYTES) {
//     return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//   }
//   return "";
// };

// const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const { has } = useAuth();
//   // console.log("has", has);

//   const hasSubscription = async (): Promise<boolean> => {
//     try {
//       const res = await axios.post("/api/check-subscription", {
//         plan: "pro",
//       });
//       // console.log("res in ResumeUploadDialog", res);
//       return res.data?.hasAccess ?? false;
//     } catch {
//       return false;
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const resetState = () => {
//     setSelectedFile(null);
//     setError("");
//     setIsDragging(false);
//     setIsUploading(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");
//     // TODO: Implement upload logic here, e.g. upload to server or cloud storage
//     try {
//       const recordId = uuidv4();
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("recordId", recordId);
//       // formData.append("aiAgentType", "/ai-tools/ai-resume-analyzer");
//       // formData.append("userEmail", "test@example.com");

//       // // @ts-ignore
//       // const hasSubscriptionEnbled = await has({ plan: "pro" });
//       // console.log("hasSubscriptionEnbled", hasSubscriptionEnbled);

//       const hasSubscriptionEnbled = await hasSubscription();
//       console.log("hasSubscriptionEnbled", hasSubscriptionEnbled);

//       if (!hasSubscription) {
//         const resultHistory = await axios.get("/api/history");
//         const historyList = resultHistory.data;
//         const isPresent = await historyList.find(
//           (item: any) => item.aiAgentType === "/ai-tools/ai-resume-analyzer"
//         );
//         router.push("/billing");
//         if (isPresent) {
//           return null;
//         }
//       }

//       const res = await axios.post("/api/ai-resume-agent", formData);

//       console.log("res", res.data);

//       onOpenChange(false);
//       resetState();
//       router.push(`/ai_tools/ai-resume-analyzer/${recordId}`);
//     } catch (uploadError) {
//       console.error("Upload failed:", uploadError);
//       setError("Failed to upload file. Please try again.");
//       setIsUploading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetState();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>Upload Resume PDF</DialogTitle>
//           <DialogDescription>
//             <div className="mb-4 text-sm text-gray-500">
//               Please upload your resume as a PDF file. Max size:{" "}
//               {MAX_FILE_SIZE_MB}MB.
//             </div>

//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               className={`mb-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
//                 isDragging
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   fileInputRef.current?.click();
//                 }
//               }}
//               aria-label="File upload dropzone, click or drag and drop PDF file here"
//             >
//               <p className="text-gray-700 text-center">
//                 Drag & drop your PDF here, or click to select a file
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//               />
//             </div>

//             {selectedFile && (
//               <div className="text-green-600 text-sm mb-2" aria-live="polite">
//                 Selected file: <strong>{selectedFile.name}</strong> (
//                 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//               </div>
//             )}

//             {error && (
//               <div
//                 className="text-red-600 text-sm mb-2"
//                 role="alert"
//                 aria-live="assertive"
//               >
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-2 justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//                 onClick={handleCancel}
//                 type="button"
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//                 onClick={handleUpload}
//                 type="button"
//                 disabled={!selectedFile || !!error || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ResumeUploadDialog;

// "use client";

// import React, { useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const validateFile = (file: File) => {
//   if (file.type !== "application/pdf") {
//     return "Only PDF files are allowed.";
//   }
//   if (file.size > MAX_FILE_SIZE_BYTES) {
//     return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//   }
//   return "";
// };

// const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   // const { has } = useAuth();

//   const hasSubscription = async (): Promise<boolean> => {
//     try {
//       const res = await axios.post("/api/check-subscription", {
//         plan: "pro",
//       });
//       return res.data?.hasAccess ?? false;
//     } catch {
//       return false;
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const resetState = () => {
//     setSelectedFile(null);
//     setError("");
//     setIsDragging(false);
//     setIsUploading(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       const recordId = uuidv4();
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("recordId", recordId);

//       const hasSubscriptionEnbled = await hasSubscription();
//       console.log("hasSubscriptionEnbled", hasSubscriptionEnbled);

//       if (!hasSubscriptionEnbled) {
//         const resultHistory = await axios.get("/api/history");
//         const historyList = resultHistory.data;

//         const isPresent = historyList.find(
//           (item: any) => item.aiAgentType === "/ai-tools/ai-resume-analyzer"
//         );

//         if (isPresent) {
//           router.push("/billing");
//           resetState();
//           return;
//         }
//       }

//       const res = await axios.post("/api/ai-resume-agent", formData);
//       console.log("res", res.data);

//       onOpenChange(false);
//       resetState();
//       router.push(`/ai_tools/ai-resume-analyzer/${recordId}`);
//     } catch (uploadError) {
//       console.error("Upload failed:", uploadError);
//       setError("Failed to upload file. Please try again.");
//       setIsUploading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetState();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>Upload Resume PDF</DialogTitle>
//           <DialogDescription>
//             <div className="mb-4 text-sm text-gray-500">
//               Please upload your resume as a PDF file. Max size:{" "}
//               {MAX_FILE_SIZE_MB}MB.
//             </div>

//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               className={`mb-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
//                 isDragging
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   fileInputRef.current?.click();
//                 }
//               }}
//               aria-label="File upload dropzone, click or drag and drop PDF file here"
//             >
//               <p className="text-gray-700 text-center">
//                 Drag & drop your PDF here, or click to select a file
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//               />
//             </div>

//             {selectedFile && (
//               <div className="text-green-600 text-sm mb-2" aria-live="polite">
//                 Selected file: <strong>{selectedFile.name}</strong> (
//                 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//               </div>
//             )}

//             {error && (
//               <div
//                 className="text-red-600 text-sm mb-2"
//                 role="alert"
//                 aria-live="assertive"
//               >
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-2 justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//                 onClick={handleCancel}
//                 type="button"
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//                 onClick={handleUpload}
//                 type="button"
//                 disabled={!selectedFile || !!error || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ResumeUploadDialog;

"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Optional toast support

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ResumeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const validateFile = (file: File) => {
  if (file.type !== "application/pdf") {
    return "Only PDF files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
  }
  return "";
};

const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const hasSubscription = async (): Promise<boolean> => {
    try {
      const res = await axios.get("/api/check-subscription");
      return res.data?.hasAccess ?? false;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const resetState = () => {
    setSelectedFile(null);
    setError("");
    setIsDragging(false);
    setIsUploading(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const recordId = uuidv4();
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("recordId", recordId);

      const hasSubscriptionEnabled = await hasSubscription();

      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get("/api/history");
        const historyList = resultHistory.data;

        const isPresent = historyList.find(
          (item: any) => item.aiAgentType === "/ai_tools/ai-resume-analyzer"
        );

        // console.log("isPresent", isPresent);

        if (isPresent) {
          toast.warning(
            "You've used your free roadmap. Upgrade for unlimited access."
          );
          router.push("/billing");
          resetState();
          return;
        }
      }

      const res = await axios.post("/api/ai-resume-agent", formData);
      // console.log("res", res.data);
      toast.success("Resume uploaded successfully!");

      onOpenChange(false);
      resetState();
      router.push(`/ai_tools/ai-resume-analyzer/${recordId}`);
    } catch (uploadError) {
      console.error("Upload failed:", uploadError);
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Upload Resume PDF</DialogTitle>
          <DialogDescription>
            <div className="mb-4 text-sm text-gray-500">
              Please upload your resume as a PDF file. Max size:{" "}
              {MAX_FILE_SIZE_MB}MB.
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`mb-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="File upload dropzone, click or drag and drop PDF file here"
            >
              <p className="text-gray-700 text-center">
                Drag & drop your PDF here, or click to select a file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            {selectedFile && (
              <div className="text-green-600 text-sm mb-2" aria-live="polite">
                Selected file: <strong>{selectedFile.name}</strong> (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            {error && (
              <div
                className="text-red-600 text-sm mb-2"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
                onClick={handleCancel}
                type="button"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                onClick={handleUpload}
                type="button"
                disabled={!selectedFile || !!error || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
