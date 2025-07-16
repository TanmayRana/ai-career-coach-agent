"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

interface RecommendationsProps {
  tips: string[];
}

export function Recommendations({ tips }: RecommendationsProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg bg-card/70 hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground font-headline flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Improvement Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex gap-4 p-3 rounded-lg bg-background/50 border hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground leading-relaxed">{tip}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
