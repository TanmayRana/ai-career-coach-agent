"use client";

import { ReactFlow, Background, Panel, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RefreshCw, Maximize2, Download } from "lucide-react";
import TurboNode from "./TurboNode";
import { useCallback, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image"; // ✅ correct import
// import DownloadButton from "./DownloadButton";

interface RoadmapCanvasProps {
  initialNodes: any[];
  initialEdges: any[];
  title?: string;
}

const nodeTypes = {
  turbo: TurboNode,
};

const connectionLineStyle = { stroke: "#ffff" };
const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

const RoadmapCanvas = ({
  initialNodes,
  initialEdges,
  title,
}: RoadmapCanvasProps) => {
  // const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      // ref={wrapperRef}
      className="w-full h-[700px] rounded-xl border border-border bg-card shadow-lg overflow-hidden"
    >
      {/* Title Header */}
      {title && (
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}

      {/* ReactFlow Container */}
      <div className="relative h-full">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.15,
            includeHiddenNodes: true,
            minZoom: 0.5,
            maxZoom: 1.5,
          }}
          attributionPosition="bottom-left"
          className="bg-background"
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          connectionLineStyle={connectionLineStyle}
          // connectionLineType="smoothstep"
          snapToGrid={true}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background gap={20} size={1} color="hsl(var(--border))" />

          {/* Custom Control Panel */}
          <Panel
            position="top-right"
            className="flex gap-2 p-2 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border"
          >
            <ControlButton icon={ZoomIn} label="Zoom In" action="zoomIn" />
            <ControlButton icon={ZoomOut} label="Zoom Out" action="zoomOut" />
            <ControlButton
              icon={RefreshCw}
              label="Reset View"
              action="fitView"
            />
            <ControlButton icon={Maximize2} label="Fit View" action="fitView" />
            {/* <ControlButton
              icon={Download}
              label="Download PNG"
              action="download"
              onClick={handleImageDownload}
            /> */}
            {/* <DownloadButton /> */}
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

interface ControlButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: string;
  onClick?: () => void;
}

const ControlButton = ({
  icon: Icon,
  label,
  action,
  onClick,
}: ControlButtonProps) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleClick = () => {
    switch (action) {
      case "zoomIn":
        zoomIn();
        break;
      case "zoomOut":
        zoomOut();
        break;
      case "fitView":
        fitView({ padding: 0.1 });
        break;
      // case "download":
      //   onClick?.();
      //   break;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
      aria-label={label}
      onClick={handleClick}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};

export default RoadmapCanvas;
