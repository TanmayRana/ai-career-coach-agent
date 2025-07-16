"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Contact,
  FileText,
  GraduationCap,
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface Section {
  score: number;
  comment: string;
}

interface MetricsGridProps {
  sections: {
    contact_info: Section;
    experience: Section;
    education: Section;
    skills: Section;
  };
}

const sectionIcons = {
  "Contact Info": Contact,
  Experience: FileText,
  Education: GraduationCap,
  Skills: Brain,
};

const getScoreStyling = (score: number) => {
  if (score >= 80)
    return {
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/50",
      Icon: CheckCircle,
    };
  if (score >= 60)
    return {
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
      Icon: AlertTriangle,
    };
  return {
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/50",
    Icon: XCircle,
  };
};

export function MetricsGrid({ sections }: MetricsGridProps) {
  const metrics = [
    { label: "Contact Info", data: sections.contact_info },
    { label: "Experience", data: sections.experience },
    { label: "Education", data: sections.education },
    { label: "Skills", data: sections.skills },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metrics.map((metric) => {
        if (!metric.data) return null;
        const Icon = sectionIcons[metric.label as keyof typeof sectionIcons];
        const scoreStyling = getScoreStyling(metric.data.score);
        const StatusIcon = scoreStyling.Icon;
        return (
          <Card
            key={metric.label}
            className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-lg ${scoreStyling.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${scoreStyling.color}`} />
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${scoreStyling.color}`}>
                    {metric.data.score}%
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground pt-1">
                {metric.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {metric.data.comment}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
