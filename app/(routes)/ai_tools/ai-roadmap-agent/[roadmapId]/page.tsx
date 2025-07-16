"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Clock, Award, Target, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RoadmapCanvas from "../_components/RoadmapCanvas";
import axios from "axios";
import RoadmapDialog from "@/app/(routes)/dashboard/_components/RoadmapDialog";

export default function RoadmapGenerator() {
  const { roadmapId } = useParams();
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [downloadRoadmap, setDownloadRoadmap] = useState<string>();
  const [open, setopen] = useState(false);

  useEffect(() => {
    if (!roadmapId) return;

    const getRoadmapData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/history?recordId=${roadmapId}`);
        setAiReport(res?.data?.content);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getRoadmapData();
  }, [roadmapId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <Skeleton className="h-96 rounded-xl" />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-[600px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-96">
            <Card className="bg-destructive/10 border-destructive/20 max-w-md">
              <CardContent className="p-6 text-center">
                <p className="text-destructive font-medium">Error: {error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Career Roadmap
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey and achieve your goals
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Card */}
          <div className="lg:col-span-4">
            <Card className="sticky top-6 shadow-lg border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  {aiReport?.roadmapTitle || "Career Roadmap"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Description
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aiReport?.description || "No description available"}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {aiReport?.duration || "Flexible duration"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setopen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Create New
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Learning Path Visualization
                </h2>
                <p className="text-muted-foreground mt-1">
                  Interactive roadmap with milestones and progress tracking
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {aiReport?.initialNodes?.length || 0} Steps
              </Badge>
            </div>

            <RoadmapCanvas
              initialNodes={aiReport?.initialNodes || []}
              initialEdges={aiReport?.initialEdges || []}
              // setDownloadRoadmap={setDownloadRoadmap}
            />
          </div>
        </div>
      </div>
      <RoadmapDialog open={open} onOpenChange={setopen} />
    </div>
  );
}
