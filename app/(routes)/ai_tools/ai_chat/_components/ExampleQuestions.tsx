import {
  Plus,
  Send,
  Sparkles,
  MessageCircle,
  Zap,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

const ExampleQuestions = ({
  onQuestionClick,
}: {
  onQuestionClick: (question: string) => void;
}) => {
  const exampleQuestions = [
    {
      question: "What skills do I need for a data analyst role?",
      icon: <TrendingUp className="w-4 h-4" />,
      category: "Career Skills",
    },
    {
      question: "How do I switch careers to UX design?",
      icon: <Users className="w-4 h-4" />,
      category: "Career Transition",
    },
    {
      question: "What's the salary range for software engineers?",
      icon: <Zap className="w-4 h-4" />,
      category: "Salary Info",
    },
    {
      question: "How to prepare for technical interviews?",
      icon: <Clock className="w-4 h-4" />,
      category: "Interview Prep",
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
        Try these popular questions:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {exampleQuestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(item.question)}
            className="group p-4 text-left bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            aria-label={`Example question: ${item.question}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-600 mb-1">
                  {item.category}
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  {item.question}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleQuestions;
