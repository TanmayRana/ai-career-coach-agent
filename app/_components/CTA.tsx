import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTA: React.FC = () => {
  const benefits = [
    "Personalized career roadmap in minutes",
    "Real-time market insights and salary data",
    "24/7 AI coaching support",
    "No credit card required to start",
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of professionals who've accelerated their careers
                with our AI-powered coaching platform. Start your journey today
                and unlock your full potential.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold text-lg">
                  Schedule Demo
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Free 7-day trial • No commitment • Cancel anytime
              </p>
            </div>

            {/* Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 lg:p-12 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your AI Career Coach
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ready to help you succeed
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Quick Analysis
                    </div>
                    <div className="text-sm text-gray-900">
                      Based on your profile, I see 5 growth opportunities...
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 mb-1">
                      Personalized Roadmap
                    </div>
                    <div className="text-sm text-gray-900">
                      Here's your 6-month career advancement plan...
                    </div>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="text-xs text-teal-600 mb-1">
                      Market Insights
                    </div>
                    <div className="text-sm text-gray-900">
                      Current demand for your skills: Very High
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg mt-6 font-medium hover:shadow-lg transition-shadow duration-200">
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
