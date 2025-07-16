"use client";

import { Button } from "@/components/ui/button";
import AvailableTools from "./AvailableTools";
import PreviousHistory from "./PreviousHistory";

const WelcomePage = () => {
  const handleGetStarted = () => {
    console.log("Get Started clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Career Coach Agent
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Smarter career decisions start here — get tailored advice, real-time
            market insights, and a roadmap built just for you with the power of
            AI.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStarted}
            className="text-base font-semibold px-8 py-3 hover:scale-105 transition-transform duration-300"
          >
            Let's Get Started
          </Button>
        </div>
      </div>

      {/* Available AI Tools Section */}
      <AvailableTools />

      {/* Previous History Section */}
      <PreviousHistory />
    </div>
  );
};

export default WelcomePage;
