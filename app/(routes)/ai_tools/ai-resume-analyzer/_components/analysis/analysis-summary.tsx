"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface AnalysisSummaryProps {
  strengths: string[];
  weaknesses: string[];
}

export function AnalysisSummary({
  strengths,
  weaknesses,
}: AnalysisSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="shadow-lg bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50">
        <CardHeader>
          <CardTitle className="text-base font-bold text-green-800 dark:text-green-300 font-headline flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            What's Good
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {strengths?.map((strength, index) => (
            <div key={index} className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
              <p className="text-sm text-foreground/80 dark:text-foreground/70">
                {strength}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-red-50/50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50">
        <CardHeader>
          <CardTitle className="text-base font-bold text-red-800 dark:text-red-300 font-headline flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Needs Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {weaknesses?.map((weakness, index) => (
            <div key={index} className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              <p className="text-sm text-foreground/80 dark:text-foreground/70">
                {weakness}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
