"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { tools } from "./WelcomePage";
import Link from "next/link";
import { tools } from "./AvailableTools";

interface HistoryItem {
  id: string;
  title: string;
  createdAt: string;
  aiAgentType: string;
  icon?: string;
  recordId: string;
}

const getAgentData = (path: string) => {
  return tools.find((tool) => tool.path === path);
};

const SkeletonCard = () => (
  <Card className="p-6 rounded-2xl border border-border/40">
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="w-10 h-10 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-3 w-full mb-1" />
    <Skeleton className="h-3 w-5/6" />
  </Card>
);

const PreviousHistory = () => {
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log("userHistory", userHistory);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get("/api/history");
        setUserHistory(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <div className="px-6 py-10 bg-gradient-to-br from-muted/40 to-muted/10 shadow-md border border-border/50 rounded-lg ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Previous History
          </h2>
          <p className="text-muted-foreground text-lg">
            Revisit your past interactions and tools used.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : userHistory.length === 0 ? (
          <Card className="p-12 text-center bg-background shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/20">
                <Image src="/idea.png" alt="logo" width={60} height={60} />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                You don’t have any history yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start using our tools — your journey will be saved here.
              </p>
              <Button
                variant="default"
                // onClick={onGetStarted}
                className="px-8 py-2 rounded-full"
              >
                Get Started
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {userHistory.map((item) => {
              const agent = getAgentData(item.aiAgentType);

              // console.log("item.aiAgentType", item.aiAgentType);

              return (
                <Link
                  key={item.id}
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}${item.aiAgentType}/${item.recordId}`}
                  className="block"
                >
                  <Card className="p-6 bg-background shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-border/40 hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      {agent?.icon && (
                        <Image
                          src={agent.icon}
                          alt="Agent Icon"
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {agent?.title ?? "Unknown Agent"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.title}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousHistory;
