// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { useState, useRef, useEffect } from "react";
// import { Plus, Send, Sparkles, Bot, User, RotateCcw } from "lucide-react";
// // import ExampleQuestions from "./_components/ExampleQuestions";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import ExampleQuestions from "../_components/ExampleQuestions";
// import { useParams } from "next/navigation";

// interface Message {
//   role: "user" | "ai";
//   content: string;
//   type: string;
//   timestamp: Date;
// }

// const AiChatPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { chatId } = useParams();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleNewChat = () => {
//     setMessages([]);
//     setInputValue("");
//   };

//   const handleExampleQuestion = (question: string) => {
//     setInputValue(question);
//   };

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const newUserMessage: Message = {
//       role: "user",
//       content: inputValue,
//       type: "text",
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setIsTyping(true);

//     try {
//       const response = await axios.post("/api/ai-career-chat-agent", {
//         userInput: inputValue,
//       });

//       console.log("response in ai_tools/ai_chat page", response.data);

//       const aiMessage: Message = {
//         role: "ai",
//         content: response.data.content ?? "Sorry, I could not find an answer.",
//         type: "text",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       const aiMessage: Message = {
//         role: "ai",
//         content: "There was an error processing your request.",
//         type: "text",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setIsTyping(false);
//       setInputValue("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const handleSaveHistory = async () => {
//     const res = await axios.put("/api/history", {
//       recordId: chatId,
//       content: messages,
//     });
//     console.log("res in ai_tools/ai_chat page", res);
//   };

//   useEffect(() => {
//     handleSaveHistory();
//   }, [messages]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
//       {/* Enhanced Header */}
//       <header className="border-b border-border/50 bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
//               <Sparkles className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 AI Career Assistant
//               </h1>
//               <p className="text-sm text-muted-foreground font-medium">
//                 Your personal career guidance companion
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleNewChat}
//             className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
//           >
//             <RotateCcw className="w-4 h-4" />
//             New Chat
//           </Button>
//         </div>
//       </header>

//       {/* Enhanced Main Content */}
//       <main className="flex-grow flex justify-center items-start py-8 px-4">
//         <div className="w-full max-w-5xl mx-auto">
//           <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl min-h-[700px] flex flex-col overflow-hidden">
//             <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
//               <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
//                 <Sparkles className="w-10 h-10 text-white" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
//                 Ask me anything about your career
//               </CardTitle>
//               <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 I'm here to help you navigate your career journey with
//                 personalized advice and insights
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="flex-grow flex flex-col p-0 relative">
//               {/* Chat Messages Area */}
//               <div className="flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] pb-32">
//                 {messages.length > 0 ? (
//                   <div className="space-y-6">
//                     {messages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`flex ${
//                           msg.role === "user" ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex items-start gap-3 max-w-[80%] ${
//                             msg.role === "user"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           {/* Avatar */}
//                           <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                 : "bg-gradient-to-r from-purple-500 to-purple-600"
//                             }`}
//                           >
//                             {msg.role === "user" ? (
//                               <User className="w-5 h-5 text-white" />
//                             ) : (
//                               <Bot className="w-5 h-5 text-white" />
//                             )}
//                           </div>

//                           {/* Message Bubble */}
//                           <div
//                             className={`rounded-2xl px-6 py-4 shadow-sm ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                                 : "bg-gray-50 border border-gray-200 text-gray-800"
//                             }`}
//                           >
//                             <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
//                               {msg.role === "ai" ? (
//                                 <ReactMarkdown className="prose prose-sm max-w-none">
//                                   {msg.content}
//                                 </ReactMarkdown>
//                               ) : (
//                                 <p>{msg.content}</p>
//                               )}
//                             </div>
//                             <p
//                               className={`text-xs mt-2 ${
//                                 msg.role === "user"
//                                   ? "text-blue-100"
//                                   : "text-gray-500"
//                               }`}
//                             >
//                               {formatTime(msg.timestamp)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <ExampleQuestions onQuestionClick={handleExampleQuestion} />
//                   </div>
//                 )}

//                 {/* Enhanced Loading indicator */}
//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
//                         <Bot className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <div className="flex gap-1">
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "0ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "150ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "300ms" }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 ml-2">
//                             AI is thinking...
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Fixed Chat Input */}
//               <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSendMessage();
//                   }}
//                   className="relative"
//                 >
//                   <div className="relative">
//                     <Input
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="💬 Ask me anything about your career goals, skills, job search, or professional development..."
//                       className="w-full py-6 px-6 pr-20 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base resize-none placeholder:text-gray-400 placeholder:font-medium hover:border-gray-300 hover:shadow-2xl"
//                       autoComplete="off"
//                       disabled={isTyping}
//                     />
//                     <Button
//                       type="submit"
//                       size="icon"
//                       disabled={!inputValue.trim() || isTyping}
//                       aria-label="Send message"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 w-12 h-12 border-2 border-white/20 hover:shadow-2xl"
//                     >
//                       {isTyping ? (
//                         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <Send className="w-5 h-5" />
//                       )}
//                     </Button>
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <p className="text-sm text-gray-500 font-medium">
//                       Press Enter to send • Shift+Enter for new line
//                     </p>
//                     {messages.length > 0 && (
//                       <p className="text-sm text-gray-500 font-medium">
//                         {messages.length} message
//                         {messages.length !== 1 ? "s" : ""}
//                       </p>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AiChatPage;

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Plus, Send, Sparkles, Bot, User, RotateCcw } from "lucide-react";
// import ExampleQuestions from "../_components/ExampleQuestions";

// interface Message {
//   role: "user" | "ai";
//   content: string;
//   type: string;
//   timestamp: Date;
// }

// const AiChatPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const params = useParams();
//   const chatId = params?.chatId?.toString() ?? "";

//   const getHistory = async () => {
//     const res = await axios.get(`/api/history?recordId=${chatId}`);
//     console.log("res in ai_tools/ai_chat page", res);
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleNewChat = () => {
//     setMessages([]);
//     setInputValue("");
//   };

//   const handleExampleQuestion = (question: string) => {
//     setInputValue(question);
//   };

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const newUserMessage: Message = {
//       role: "user",
//       content: inputValue,
//       type: "text",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, newUserMessage]);
//     setIsTyping(true);

//     try {
//       const response = await axios.post("/api/ai-career-chat-agent", {
//         userInput: inputValue,
//       });

//       const aiMessage: Message = {
//         role: "ai",
//         content: response.data.content ?? "Sorry, I could not find an answer.",
//         type: "text",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       const aiMessage: Message = {
//         role: "ai",
//         content: "There was an error processing your request.",
//         type: "text",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setIsTyping(false);
//       setInputValue("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (date: Date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleSaveHistory = async () => {
//     if (!chatId || messages.length === 0) return;

//     try {
//       await axios.put("/api/history", {
//         recordId: chatId,
//         content: messages.map((msg) => ({
//           ...msg,
//           timestamp: msg.timestamp.toISOString(),
//         })),
//       });
//     } catch (error) {
//       console.error("Failed to save chat history:", error);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (!isTyping) {
//         handleSaveHistory();
//       }
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, [messages, isTyping]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
//               <Sparkles className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 AI Career Assistant
//               </h1>
//               <p className="text-sm text-muted-foreground font-medium">
//                 Your personal career guidance companion
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleNewChat}
//             className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
//           >
//             <RotateCcw className="w-4 h-4" />
//             New Chat
//           </Button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-grow flex justify-center items-start py-8 px-4">
//         <div className="w-full max-w-5xl mx-auto">
//           <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl min-h-[700px] flex flex-col overflow-hidden">
//             <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
//               <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
//                 <Sparkles className="w-10 h-10 text-white" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
//                 Ask me anything about your career
//               </CardTitle>
//               <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 I'm here to help you navigate your career journey with
//                 personalized advice and insights
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="flex-grow flex flex-col p-0 relative">
//               {/* Messages */}
//               <div className="flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] pb-32">
//                 {messages.length > 0 ? (
//                   <div className="space-y-6">
//                     {messages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`flex ${
//                           msg.role === "user" ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex items-start gap-3 max-w-[80%] ${
//                             msg.role === "user"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           {/* Avatar */}
//                           <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                 : "bg-gradient-to-r from-purple-500 to-purple-600"
//                             }`}
//                           >
//                             {msg.role === "user" ? (
//                               <User className="w-5 h-5 text-white" />
//                             ) : (
//                               <Bot className="w-5 h-5 text-white" />
//                             )}
//                           </div>

//                           {/* Bubble */}
//                           <div
//                             className={`rounded-2xl px-6 py-4 shadow-sm ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                                 : "bg-gray-50 border border-gray-200 text-gray-800"
//                             }`}
//                           >
//                             <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
//                               {msg.role === "ai" ? (
//                                 <ReactMarkdown className="prose prose-sm max-w-none">
//                                   {msg.content}
//                                 </ReactMarkdown>
//                               ) : (
//                                 <p>{msg.content}</p>
//                               )}
//                             </div>
//                             <p
//                               className={`text-xs mt-2 ${
//                                 msg.role === "user"
//                                   ? "text-blue-100"
//                                   : "text-gray-500"
//                               }`}
//                             >
//                               {formatTime(msg.timestamp)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <ExampleQuestions onQuestionClick={handleExampleQuestion} />
//                   </div>
//                 )}

//                 {/* Typing indicator */}
//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
//                         <Bot className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <div className="flex gap-1">
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "0ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "150ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "300ms" }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 ml-2">
//                             AI is thinking...
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input Box */}
//               <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSendMessage();
//                   }}
//                   className="relative"
//                 >
//                   <div className="relative">
//                     <Input
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="💬 Ask me anything about your career goals, skills, job search, or professional development..."
//                       className="w-full py-6 px-6 pr-20 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base resize-none placeholder:text-gray-400 placeholder:font-medium hover:border-gray-300 hover:shadow-2xl"
//                       autoComplete="off"
//                       disabled={isTyping}
//                     />
//                     <Button
//                       type="submit"
//                       size="icon"
//                       disabled={!inputValue.trim() || isTyping}
//                       aria-label="Send message"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 w-12 h-12 border-2 border-white/20 hover:shadow-2xl"
//                     >
//                       {isTyping ? (
//                         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <Send className="w-5 h-5" />
//                       )}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between mt-4">
//                     <p className="text-sm text-gray-500 font-medium">
//                       Press Enter to send • Shift+Enter for new line
//                     </p>
//                     {messages.length > 0 && (
//                       <p className="text-sm text-gray-500 font-medium">
//                         {messages.length} message
//                         {messages.length !== 1 ? "s" : ""}
//                       </p>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AiChatPage;

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send, Sparkles, Bot, User, RotateCcw } from "lucide-react";
// import ExampleQuestions from "../_components/ExampleQuestions";

// interface Message {
//   role: "user" | "ai";
//   content: string;
//   type: string;
//   timestamp: Date;
// }

// const AiChatPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [loadedHistory, setLoadedHistory] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const params = useParams();
//   const chatId = params?.chatId?.toString() ?? "";

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const formatTime = (date: Date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleNewChat = () => {
//     setMessages([]);
//     setInputValue("");
//   };

//   const handleExampleQuestion = (question: string) => {
//     setInputValue(question);
//   };

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const newUserMessage: Message = {
//       role: "user",
//       content: inputValue,
//       type: "text",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, newUserMessage]);
//     setIsTyping(true);

//     try {
//       const response = await axios.post("/api/ai-career-chat-agent", {
//         userInput: inputValue,
//       });

//       const aiMessage: Message = {
//         role: "ai",
//         content: response.data.content ?? "Sorry, I could not find an answer.",
//         type: "text",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const aiMessage: Message = {
//         role: "ai",
//         content: "There was an error processing your request.",
//         type: "text",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setIsTyping(false);
//       setInputValue("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleSaveHistory = async () => {
//     if (!chatId || messages.length === 0) return;

//     try {
//       await axios.post("/api/history", {
//         recordId: chatId,
//         content: messages.map((msg) => ({
//           ...msg,
//           timestamp: msg.timestamp.toISOString(),
//         })),
//       });
//     } catch (error) {
//       console.error("Failed to save chat history:", error);
//     }
//   };

//   const getHistory = async () => {
//     try {
//       const res = await axios.get(`/api/history?recordId=${chatId}`);
//       const history = res.data?.result?.content || [];

//       const parsed = history.map((msg: any) => ({
//         ...msg,
//         timestamp: new Date(msg.timestamp),
//       }));

//       setMessages(parsed);
//       setLoadedHistory(true);
//     } catch (error) {
//       console.error("Failed to load chat history:", error);
//     }
//   };

//   useEffect(() => {
//     if (chatId) getHistory();
//   }, [chatId]);

//   useEffect(() => {
//     if (!loadedHistory) return;

//     const timeout = setTimeout(() => {
//       if (!isTyping && messages.length > 0) {
//         handleSaveHistory();
//       }
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, [messages, isTyping, loadedHistory]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
//               <Sparkles className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 AI Career Assistant
//               </h1>
//               <p className="text-sm text-muted-foreground font-medium">
//                 Your personal career guidance companion
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleNewChat}
//             className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
//           >
//             <RotateCcw className="w-4 h-4" />
//             New Chat
//           </Button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-grow flex justify-center items-start py-8 px-4">
//         <div className="w-full max-w-5xl mx-auto">
//           <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl min-h-[700px] flex flex-col overflow-hidden">
//             <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
//               <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
//                 <Sparkles className="w-10 h-10 text-white" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
//                 Ask me anything about your career
//               </CardTitle>
//               <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 I'm here to help you navigate your career journey with
//                 personalized advice and insights
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="flex-grow flex flex-col p-0 relative">
//               <div className="flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] pb-32">
//                 {messages.length > 0 ? (
//                   <div className="space-y-6">
//                     {messages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`flex ${
//                           msg.role === "user" ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex items-start gap-3 max-w-[80%] ${
//                             msg.role === "user"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                 : "bg-gradient-to-r from-purple-500 to-purple-600"
//                             }`}
//                           >
//                             {msg.role === "user" ? (
//                               <User className="w-5 h-5 text-white" />
//                             ) : (
//                               <Bot className="w-5 h-5 text-white" />
//                             )}
//                           </div>
//                           <div
//                             className={`rounded-2xl px-6 py-4 shadow-sm ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                                 : "bg-gray-50 border border-gray-200 text-gray-800"
//                             }`}
//                           >
//                             <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
//                               {msg.role === "ai" ? (
//                                 <ReactMarkdown className="prose prose-sm max-w-none">
//                                   {msg.content}
//                                 </ReactMarkdown>
//                               ) : (
//                                 <p>{msg.content}</p>
//                               )}
//                             </div>
//                             <p
//                               className={`text-xs mt-2 ${
//                                 msg.role === "user"
//                                   ? "text-blue-100"
//                                   : "text-gray-500"
//                               }`}
//                             >
//                               {formatTime(msg.timestamp)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <ExampleQuestions onQuestionClick={handleExampleQuestion} />
//                   </div>
//                 )}

//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
//                         <Bot className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <div className="flex gap-1">
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "0ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "150ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "300ms" }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 ml-2">
//                             AI is thinking...
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input box */}
//               <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSendMessage();
//                   }}
//                   className="relative"
//                 >
//                   <div className="relative">
//                     <Input
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="💬 Ask me anything about your career goals, skills, job search, or professional development..."
//                       className="w-full py-6 px-6 pr-20 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base resize-none placeholder:text-gray-400 placeholder:font-medium hover:border-gray-300 hover:shadow-2xl"
//                       autoComplete="off"
//                       disabled={isTyping}
//                     />
//                     <Button
//                       type="submit"
//                       size="icon"
//                       disabled={!inputValue.trim() || isTyping}
//                       aria-label="Send message"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 w-12 h-12 border-2 border-white/20 hover:shadow-2xl"
//                     >
//                       {isTyping ? (
//                         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <Send className="w-5 h-5" />
//                       )}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between mt-4">
//                     <p className="text-sm text-gray-500 font-medium">
//                       Press Enter to send • Shift+Enter for new line
//                     </p>
//                     {messages.length > 0 && (
//                       <p className="text-sm text-gray-500 font-medium">
//                         {messages.length} message
//                         {messages.length !== 1 ? "s" : ""}
//                       </p>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AiChatPage;

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send, Sparkles, Bot, User, RotateCcw } from "lucide-react";
// import ExampleQuestions from "../_components/ExampleQuestions";

// interface Message {
//   role: "user" | "ai";
//   content: string;
//   type: string;
//   timestamp: Date;
// }

// const AiChatPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [loadedHistory, setLoadedHistory] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const params = useParams();
//   const chatId = params?.chatId?.toString() ?? "";

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const formatTime = (date: Date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleNewChat = () => {
//     setMessages([]);
//     setInputValue("");
//   };

//   const handleExampleQuestion = (question: string) => {
//     setInputValue(question);
//   };

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const newUserMessage: Message = {
//       role: "user",
//       content: inputValue,
//       type: "text",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, newUserMessage]);
//     setIsTyping(true);

//     try {
//       const response = await axios.post("/api/ai-career-chat-agent", {
//         userInput: inputValue,
//       });

//       const aiMessage: Message = {
//         role: "ai",
//         content: response.data.content ?? "Sorry, I could not find an answer.",
//         type: "text",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const aiMessage: Message = {
//         role: "ai",
//         content: "There was an error processing your request.",
//         type: "text",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setIsTyping(false);
//       setInputValue("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleSaveHistory = async () => {
//     if (!chatId || messages.length === 0) return;

//     try {
//       await axios.put("/api/history", {
//         recordId: chatId,
//         content: messages.map((msg) => ({
//           ...msg,
//           createdAt: msg.timestamp.toISOString(),
//         })),
//       });
//     } catch (error) {
//       console.error("Failed to save chat history:", error);
//     }
//   };

//   const getHistory = async () => {
//     try {
//       const res = await axios.get(`/api/history?recordId=${chatId}`);
//       console.log("res in ai_tools/ai_chat page getHistory", res.data);
//       const history = res.data?.content || [];
//       console.log(
//         "history in ai_tools/ai_chat page getHistory history",
//         history
//       );

//       const parsed = history.map((msg: any) => ({
//         ...msg,
//         timestamp: new Date(msg.createdAt),
//       }));

//       setMessages(parsed);
//       setLoadedHistory(true);
//     } catch (error) {
//       console.error("Failed to load chat history:", error);
//     }
//   };

//   useEffect(() => {
//     if (chatId) getHistory();
//   }, [chatId]);

//   useEffect(() => {
//     if (!loadedHistory) return;

//     const timeout = setTimeout(() => {
//       if (!isTyping && messages.length > 0) {
//         handleSaveHistory();
//       }
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, [messages, isTyping, loadedHistory]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
//               <Sparkles className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 AI Career Assistant
//               </h1>
//               <p className="text-sm text-muted-foreground font-medium">
//                 Your personal career guidance companion
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleNewChat}
//             className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
//           >
//             <RotateCcw className="w-4 h-4" />
//             New Chat
//           </Button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-grow flex justify-center items-start py-8 px-4">
//         <div className="w-full max-w-5xl mx-auto">
//           <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl min-h-[700px] flex flex-col overflow-hidden">
//             <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
//               <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
//                 <Sparkles className="w-10 h-10 text-white" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
//                 Ask me anything about your career
//               </CardTitle>
//               <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 I'm here to help you navigate your career journey with
//                 personalized advice and insights
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="flex-grow flex flex-col p-0 relative">
//               <div className="flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] pb-32">
//                 {messages.length > 0 ? (
//                   <div className="space-y-6">
//                     {messages.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`flex ${
//                           msg.role === "user" ? "justify-end" : "justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex items-start gap-3 max-w-[80%] ${
//                             msg.role === "user"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                 : "bg-gradient-to-r from-purple-500 to-purple-600"
//                             }`}
//                           >
//                             {msg.role === "user" ? (
//                               <User className="w-5 h-5 text-white" />
//                             ) : (
//                               <Bot className="w-5 h-5 text-white" />
//                             )}
//                           </div>
//                           <div
//                             className={`rounded-2xl px-6 py-4 shadow-sm ${
//                               msg.role === "user"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
//                                 : "bg-gray-50 border border-gray-200 text-gray-800"
//                             }`}
//                           >
//                             <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
//                               {msg.role === "ai" ? (
//                                 <ReactMarkdown className="prose prose-sm max-w-none">
//                                   {msg.content}
//                                 </ReactMarkdown>
//                               ) : (
//                                 <p>{msg.content}</p>
//                               )}
//                             </div>
//                             <p
//                               className={`text-xs mt-2 ${
//                                 msg.role === "user"
//                                   ? "text-blue-100"
//                                   : "text-gray-500"
//                               }`}
//                             >
//                               {formatTime(msg.timestamp)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <ExampleQuestions onQuestionClick={handleExampleQuestion} />
//                   </div>
//                 )}

//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
//                         <Bot className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <div className="flex gap-1">
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "0ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "150ms" }}
//                             />
//                             <div
//                               className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
//                               style={{ animationDelay: "300ms" }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 ml-2">
//                             AI is thinking...
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input box */}
//               <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSendMessage();
//                   }}
//                   className="relative"
//                 >
//                   <div className="relative">
//                     <Input
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="💬 Ask me anything about your career goals, skills, job search, or professional development..."
//                       className="w-full py-6 px-6 pr-20 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base resize-none placeholder:text-gray-400 placeholder:font-medium hover:border-gray-300 hover:shadow-2xl"
//                       autoComplete="off"
//                       disabled={isTyping}
//                     />
//                     <Button
//                       type="submit"
//                       size="icon"
//                       disabled={!inputValue.trim() || isTyping}
//                       aria-label="Send message"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 w-12 h-12 border-2 border-white/20 hover:shadow-2xl"
//                     >
//                       {isTyping ? (
//                         <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <Send className="w-5 h-5" />
//                       )}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between mt-4">
//                     <p className="text-sm text-gray-500 font-medium">
//                       Press Enter to send • Shift+Enter for new line
//                     </p>
//                     {messages.length > 0 && (
//                       <p className="text-sm text-gray-500 font-medium">
//                         {messages.length} message
//                         {messages.length !== 1 ? "s" : ""}
//                       </p>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AiChatPage;

"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Bot, User, RotateCcw, Plus } from "lucide-react";
import ExampleQuestions from "../_components/ExampleQuestions";
import { v4 as uuidv4 } from "uuid";

interface Message {
  role: "user" | "ai";
  content: string;
  type: string;
  timestamp: Date;
}

const AiChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadedHistory, setLoadedHistory] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const chatId = params?.chatId?.toString() ?? "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
  };

  const handleExampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: inputValue,
      type: "text",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post("/api/ai-career-chat-agent", {
        userInput: inputValue,
      });

      const aiMessage: Message = {
        role: "ai",
        content: response.data.content ?? "Sorry, I could not find an answer.",
        type: "text",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const aiMessage: Message = {
        role: "ai",
        content: "There was an error processing your request.",
        type: "text",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveHistory = async () => {
    if (!chatId || messages.length === 0) return;

    try {
      await axios.put("/api/history", {
        recordId: chatId,
        content: messages.map((msg) => ({
          ...msg,
          createdAt: msg.timestamp.toISOString(),
        })),
      });
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  };

  const getHistory = async () => {
    if (!chatId) return;

    try {
      const res = await axios.get(`/api/history?recordId=${chatId}`);
      const history = res.data?.content || [];

      const parsed = history.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.createdAt),
      }));

      setMessages(parsed);
      setLoadedHistory(true);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  useEffect(() => {
    if (chatId) getHistory();
  }, [chatId]);

  useEffect(() => {
    if (!loadedHistory) return;

    const timeout = setTimeout(() => {
      if (!isTyping && messages.length > 0) {
        handleSaveHistory();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [messages, isTyping, loadedHistory]);

  const router = useRouter();
  const newChatId = uuidv4();

  const onNewChat = async () => {
    const res = await axios.post("/api/history", {
      recordId: newChatId,
      content: [],
    });
    // console.log("res", res);
    router.replace(`/ai_tools/ai_chat/${newChatId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Career Assistant
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Your personal career guidance companion
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNewChat()}
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex justify-center items-start py-8 px-4">
        <div className="w-full max-w-5xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl min-h-[700px] flex flex-col overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                Ask me anything about your career
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                I'm here to help you navigate your career journey with
                personalized advice and insights
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col p-0 relative">
              <div className="flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] pb-32">
                {messages.length > 0 ? (
                  <div className="space-y-6">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start gap-3 max-w-[80%] ${
                            msg.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.role === "user"
                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                : "bg-gradient-to-r from-purple-500 to-purple-600"
                            }`}
                          >
                            {msg.role === "user" ? (
                              <User className="w-5 h-5 text-white" />
                            ) : (
                              <Bot className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div
                            className={`rounded-2xl px-6 py-4 shadow-sm ${
                              msg.role === "user"
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                : "bg-gray-50 border border-gray-200 text-gray-800"
                            }`}
                          >
                            <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
                              {msg.role === "ai" ? (
                                <ReactMarkdown className="prose prose-sm max-w-none">
                                  {msg.content}
                                </ReactMarkdown>
                              ) : (
                                <p>{msg.content}</p>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-2 ${
                                msg.role === "user"
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ExampleQuestions onQuestionClick={handleExampleQuestion} />
                  </div>
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <div
                              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <div
                              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            AI is thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input box */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm p-6 shadow-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <div className="relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="💬 Ask me anything about your career goals, skills, job search, or professional development..."
                      className="w-full py-6 px-6 pr-20 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base resize-none placeholder:text-gray-400 placeholder:font-medium hover:border-gray-300 hover:shadow-2xl"
                      autoComplete="off"
                      disabled={isTyping}
                      // If Input does not support multiline, consider replacing with textarea here
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      aria-label="Send message"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 w-12 h-12 border-2 border-white/20 hover:shadow-2xl"
                    >
                      {isTyping ? (
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 font-medium">
                      Press Enter to send • Shift+Enter for new line
                    </p>
                    {messages.length > 0 && (
                      <p className="text-sm text-gray-500 font-medium">
                        {messages.length} message
                        {messages.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AiChatPage;
