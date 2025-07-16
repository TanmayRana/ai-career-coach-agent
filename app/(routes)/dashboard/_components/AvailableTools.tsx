"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ToolCard from "./ToolCard";

export const tools = [
  {
    id: "chat",
    title: "AI Career Q&A Chat",
    description: "Chat with AI Agent",
    icon: "/chatbot.png",
    buttonText: "Let's Chat",
    path: "/ai_tools/ai_chat",
  },
  {
    id: "resume",
    title: "AI Resume Analyzer",
    description: "Chat with AI Agent",
    icon: "/resume.png",
    buttonText: "Start",
    path: "/ai_tools/ai-resume-analyzer",
  },
  {
    id: "roadmap",
    title: "Learning Roadmap",
    description: "Chat with AI Agent",
    icon: "/roadmap.png",
    buttonText: "Get Started",
    path: "/ai_tools/ai-roadmap-agent",
  },
  {
    id: "cover-letter",
    title: "Cover Letter Generator",
    description: "Chat with AI Agent",
    icon: "/cover.png",
    buttonText: "Lets Generate",
    path: "/cover-letter",
  },
];

const AvailableTools = () => {
  return (
    <div className="px-4 pt-4 pb-12 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Available AI Tools
          </h2>
          <p className="text-muted-foreground text-lg">
            Start building and shape Your Career with these exclusive AI Tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                buttonText={tool.buttonText}
                path={tool.path}
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableTools;