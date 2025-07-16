"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function PremiumUpgradeCard() {
  return (
    <Card className="shadow-lg bg-gradient-to-r from-primary to-blue-600 dark:to-blue-700 text-primary-foreground hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold font-headline flex items-center justify-center gap-2">
            <Sparkles className="text-accent" />
            Ready to Refine Your Resume?
          </h3>
          <p className="text-blue-100 dark:text-blue-200 text-sm max-w-sm mx-auto">
            Unlock advanced insights, detailed keyword analysis, and tailored
            templates to make your application truly stand out.
          </p>
        </div>
        <Button
          variant="secondary"
          className="w-full mt-4 bg-white text-primary hover:bg-white/90 dark:bg-slate-100 dark:text-primary dark:hover:bg-slate-200"
        >
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
}
