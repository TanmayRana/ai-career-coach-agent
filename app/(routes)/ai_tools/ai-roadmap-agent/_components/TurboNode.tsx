import { Handle, Position } from "@xyflow/react";
import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type TurboNodeProps = {
  data: {
    title: string;
    description: string;
    link?: string;
    status?: string;
    duration?: string;
    color?: string; // e.g., "#FF5733", "#4ADE80"
  };
};

const TurboNode = ({ data }: TurboNodeProps) => {
  const color = data.color || "#3B82F6"; // default to blue-500

  return (
    <div className="group relative w-80">
      {/* Node Card */}
      <div
        className={`
          relative w-full rounded-2xl border-l-[6px] p-6 shadow-md backdrop-blur-md
          transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
          border border-border/50  bg-gradient-to-br bg-[color]
        `}
        // bg-background/80
        style={{ borderLeftColor: color }}
      >
        <div className="space-y-4 pr-20">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground">{data.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {data.description}
          </p>

          {/* Info Row */}
          <div className="flex items-center justify-between pt-2">
            {/* Duration */}
            {data.duration && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/60 border border-border/50">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-xs text-foreground">{data.duration}</span>
              </div>
            )}

            {/* Link */}
            {data.link && (
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition group/link text-blue-800 hover:underline"
              >
                Learn More
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            )}
          </div>
        </div>

        {/* React Flow Handles */}
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-primary !border-2 !border-background"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-primary !border-2 !border-background"
        />
      </div>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: color, opacity: 0.1 }}
      />
    </div>
  );
};

export default TurboNode;
