"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type Report = {
  overall_score: number;
  [key: string]: any;
};

interface OverallScoreCardProps {
  report: Report;
}

const getScoreInfo = (
  value: number | string
): { label: string; className: string; icon: React.ElementType } => {
  const label =
    typeof value === "number"
      ? value >= 80
        ? "Excellent"
        : value >= 60
        ? "Good"
        : "Needs Work"
      : value;

  switch (label.toLowerCase()) {
    case "excellent":
      return {
        label: "Excellent",
        className:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
        icon: CheckCircle,
      };
    case "good":
      return {
        label: "Good",
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
        icon: AlertTriangle,
      };
    default:
      return {
        label: "Needs Work",
        className:
          "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
        icon: XCircle,
      };
  }
};

export function OverallScoreCard({ report }: OverallScoreCardProps) {
  const score = report.overall_score || 0;
  const feedbackLabel = report?.overall_feedback ?? score; // fallback to numeric score

  const scoreInfo = getScoreInfo(feedbackLabel);
  const ScoreIcon = scoreInfo.icon;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Overall Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary/80 dark:from-primary dark:via-blue-400 dark:to-primary/80 bg-clip-text text-transparent">
            {score}
          </span>
          <span className="text-xl text-muted-foreground">/ 100</span>
          <Badge className={`ml-auto font-semibold ${scoreInfo.className}`}>
            <ScoreIcon className="w-3.5 h-3.5 mr-1.5" />
            {scoreInfo.label}
          </Badge>
        </div>
        <Progress value={score} className="h-2.5" />
        <p className="text-sm text-muted-foreground pt-2">
          {report?.summary_comment}
        </p>
      </CardContent>
    </Card>
  );
}
