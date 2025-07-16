import React from "react";
import {
  User,
  TrendingUp,
  Map,
  MessageCircle,
  Target,
  BarChart3,
} from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: User,
      title: "Personalized Career Coaching",
      description:
        "Get tailored advice based on your unique skills, experience, and career goals. Our AI analyzes your profile to provide personalized recommendations.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Market Analysis",
      description:
        "Stay ahead with current labor market trends, salary insights, and in-demand skills. Make informed decisions with live market data.",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      icon: Map,
      title: "AI-Driven Career Roadmaps",
      description:
        "Receive step-by-step guidance for your career journey. Our AI creates detailed roadmaps with milestones and actionable next steps.",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const additionalFeatures = [
    {
      icon: MessageCircle,
      title: "24/7 AI Support",
      description:
        "Get instant answers to your career questions anytime, anywhere.",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description:
        "Set and monitor your career objectives with intelligent progress tracking.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Understand your career growth with detailed analytics and insights.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              Career Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with
            personalized guidance to accelerate your career growth.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Everything You Need to Succeed
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
