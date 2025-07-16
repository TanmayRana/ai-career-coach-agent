"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const route = useRouter();
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Career Guidance
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Smarter Career{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Decisions
              </span>{" "}
              Start Here
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Get tailored career advice, real-time market insights, and a
              personalized roadmap — all powered by AI. Transform your career
              journey with intelligent guidance that adapts to your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-lg flex items-center justify-center group"
                onClick={() => route.push("/dashboard")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-medium text-lg">
                Watch Demo
              </button> */}
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    AI Career Coach
                  </div>
                  <div className="text-gray-900 font-medium">
                    "Based on your skills in data analysis and your interest in
                    sustainability, I recommend exploring roles in environmental
                    data science..."
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm">
                    That sounds perfect! What's the next step?
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-teal-500 text-white p-3 rounded-xl shadow-lg animate-bounce">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg animate-pulse">
              <div className="text-xs font-bold">AI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
