// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";

// import {
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   FileText,
//   GraduationCap,
//   Brain,
//   Contact,
//   Target,
//   Sparkles,
//   Award,
//   Eye,
//   Download,
// } from "lucide-react";
// import Link from "next/link";

// const ResumeAnalyzer = () => {
//   const { recordId } = useParams();
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [aiReport, setAiReport] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   console.log("aiReport", aiReport);

//   const analysisData = {
//     overallScore: aiReport?.overall_score,
//     contactInfo: aiReport?.sections?.contact_info?.score,
//     experience: aiReport?.sections?.experience?.score,
//     education: aiReport?.sections?.education?.score,
//     skills: aiReport?.sections?.skills?.score,
//   };

//   const getScoreLabel = (score: number) => {
//     if (score >= 80) return "Excellent";
//     if (score >= 60) return "Good";
//     return "Needs Work";
//   };

//   const tips = [
//     {
//       // title: "Quantify Achievements",
//       description:
//         "Add more numbers and metrics to your experience section to show impact.",
//       // icon: TrendingUp,
//     },
//     {
//       title: "Keywords Optimization",
//       description:
//         "Integrate more industry-specific keywords relevant to your target role.",
//       icon: Target,
//     },
//     {
//       title: "Action Verbs",
//       description: "Use strong action verbs to describe your accomplishments.",
//       icon: CheckCircle,
//     },
//   ];

//   const getResumeAnalysisResponse = async () => {
//     try {
//       const res = await axios.get(`/api/history?recordId=${recordId}`);
//       setPdfUrl(res.data?.metaData);
//       setAiReport(res.data?.content);
//     } catch (error) {
//       console.error("Error fetching resume analysis:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getResumeAnalysisResponse();
//   }, [recordId]);

//   console.log("pdfUrl", pdfUrl);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
//       {/* Header */}
//       <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
//         <div className="container mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
//                 <Brain className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-lg sm:text-xl font-bold text-foreground">
//                   AI Resume Analyzer
//                 </h1>
//                 <p className="text-[10px] sm:text-xs text-muted-foreground">
//                   Powered by advanced AI insights
//                 </p>
//               </div>
//             </div>
//             <Badge
//               variant="outline"
//               className="bg-success/10 text-success border-success/20 hidden sm:flex"
//             >
//               <Sparkles className="w-3 h-3 mr-1" />
//               AI Powered
//             </Badge>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
//           {/* Left Panel */}
//           <div className="md:col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//               <Award className="w-5 h-5 text-primary" />
//               <h2 className="text-lg sm:text-xl font-bold text-foreground">
//                 Analysis Results
//               </h2>
//               <Badge className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
//                 <Eye className="w-3 h-3 mr-1" />
//                 Live Analysis
//               </Badge>
//             </div>

//             {/* Overall Score */}
//             <Card className="shadow-xl bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
//                   <TrendingUp className="w-4 h-4" />
//                   Overall Score
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5">
//                 <div className="flex items-baseline gap-3">
//                   <span className="text-5xl font-black bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
//                     {analysisData.overallScore}
//                   </span>
//                   <span className="text-xl text-muted-foreground">/100</span>
//                   <Badge className="ml-auto bg-success/10 text-success border-success/30 font-semibold">
//                     <CheckCircle className="w-3 h-3 mr-1" />
//                     {getScoreLabel(analysisData.overallScore)}
//                   </Badge>
//                 </div>
//                 <Progress
//                   value={analysisData.overallScore}
//                   className="h-3 bg-muted"
//                 />
//                 <div className="flex justify-between text-xs text-muted-foreground">
//                   <span>Needs Work</span>
//                   <span>Good</span>
//                   <span>Excellent</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Your resume demonstrates strong potential with room for
//                   strategic improvements.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Metrics Grid */}
//             <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
//               {[
//                 {
//                   label: "Contact Info",
//                   value: analysisData.contactInfo,
//                   icon: Contact,
//                   color: "text-success",
//                   bgColor: "bg-success/10",
//                   description: aiReport?.sections?.contact_info?.comment,
//                 },
//                 {
//                   label: "Experience",
//                   value: analysisData.experience,
//                   icon: FileText,
//                   color: "text-success",
//                   bgColor: "bg-success/10",
//                   description: aiReport?.sections?.experience?.comment,
//                 },
//                 {
//                   label: "Education",
//                   value: analysisData.education,
//                   icon: GraduationCap,
//                   color: "text-warning",
//                   bgColor: "bg-warning/10",
//                   description: aiReport?.sections?.education?.comment,
//                 },
//                 {
//                   label: "Skills",
//                   value: analysisData.skills,
//                   icon: Brain,
//                   color: "text-danger",
//                   bgColor: "bg-danger/10",
//                   description: aiReport?.sections?.skills?.comment,
//                 },
//               ].map((metric, index) => (
//                 <Card
//                   key={index}
//                   className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
//                 >
//                   <CardContent className="p-5 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div
//                         className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}
//                       >
//                         <metric.icon className={`w-5 h-5 ${metric.color}`} />
//                       </div>
//                       <div className="text-right">
//                         <span className={`text-2xl font-bold ${metric.color}`}>
//                           {metric.value}%
//                         </span>
//                       </div>
//                     </div>
//                     <h3 className="font-semibold text-foreground">
//                       {metric.label}
//                     </h3>
//                     <p className="text-xs text-muted-foreground">
//                       {metric.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Tips */}
//             <Card className="shadow-lg bg-gradient-to-br from-card to-muted/20 hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
//                   <Target className="w-5 h-5 text-primary" />
//                   Improvement Recommendations
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5">
//                 {aiReport?.tips_for_improvement.map((tip, index) => (
//                   <div
//                     key={index}
//                     className="flex gap-4 p-3 rounded-lg bg-background/50 border hover:bg-muted/50"
//                   >
//                     {/* <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
//                       <tip.icon className="w-4 h-4 text-primary" />
//                     </div> */}
//                     <div>
//                       {/* <h4 className="font-semibold text-foreground">
//                         {tip.title}
//                       </h4> */}
//                       <p className="text-sm text-muted-foreground">{tip}</p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//             {/* Analysis Summary */}
//             <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
//               <Card className="shadow-lg bg-gradient-to-br from-green-50/50 to-green-100/30 border-green-100/50">
//                 <CardHeader>
//                   <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     What's Good
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {aiReport?.whats_good?.map((strength, index) => (
//                     <div key={index} className="flex gap-2 items-start">
//                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
//                       <p className="text-sm text-muted-foreground">
//                         {strength}
//                       </p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card className="shadow-lg bg-gradient-to-br from-red-50/50 to-red-100/30 border-red-100/50">
//                 <CardHeader>
//                   <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
//                     <AlertCircle className="w-5 h-5 text-red-600" />
//                     Needs Improvement
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {aiReport?.needs_improvement?.map((weakness, index) => (
//                     <div key={index} className="flex gap-2 items-start">
//                       <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
//                       <p className="text-sm text-muted-foreground">
//                         {weakness}
//                       </p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Premium Upgrade Card */}
//             <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
//               <CardContent className="p-6 space-y-4">
//                 <div className="text-center space-y-2">
//                   <h3 className="text-xl font-bold flex items-center justify-center gap-2">
//                     Ready to refine your resume?{" "}
//                     <span className="text-2xl">💪</span>
//                   </h3>
//                   <p className="text-blue-100 text-sm">
//                     Make your application stand out with our premium insights
//                     and features.
//                   </p>
//                 </div>
//                 <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//                   Upgrade to Premium
//                 </button>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-3 space-y-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
//                 <FileText className="w-5 h-5 text-primary" />
//                 Resume Preview
//               </h2>
//               {pdfUrl && (
//                 <Link
//                   href={pdfUrl}
//                   download
//                   className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-200 flex items-center gap-1"
//                 >
//                   <Download className="w-3 h-3" />
//                   Download
//                 </Link>
//               )}
//             </div>

//             <Card className="shadow-xl bg-gradient-to-br from-card to-muted/10 hover:shadow-2xl transition-shadow duration-300">
//               <CardContent className="p-2">
//                 <div className="w-full h-[400px] sm:h-[500px] lg:h-[650px] rounded-xl border relative overflow-hidden">
//                   {isLoading ? (
//                     <div className="flex flex-col items-center justify-center h-full space-y-4">
//                       <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
//                         <Brain className="w-8 h-8 text-primary" />
//                       </div>
//                       <Skeleton className="h-4 w-32" />
//                       <p className="text-sm text-muted-foreground">
//                         Analyzing your resume...
//                       </p>
//                     </div>
//                   ) : pdfUrl ? (
//                     <div className="relative w-full h-full">
//                       <Image
//                         src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
//                         alt="Resume preview"
//                         fill
//                         className="object-contain rounded-xl transition-opacity duration-300"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         priority
//                         onError={(e) => {
//                           const pdfSrc = pdfUrl.endsWith(".pdf")
//                             ? pdfUrl
//                             : `${pdfUrl}.pdf`;
//                           const iframe = document.createElement("iframe");
//                           iframe.src =
//                             pdfSrc + "#toolbar=0&navpanes=0&scrollbar=0";
//                           iframe.className =
//                             "w-full h-full rounded-lg border-0";
//                           iframe.title = "Resume PDF Preview";
//                           e.currentTarget.parentElement?.replaceChild(
//                             iframe,
//                             e.currentTarget
//                           );
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full space-y-4">
//                       <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
//                         <FileText className="w-10 h-10 text-muted-foreground" />
//                       </div>
//                       <h3 className="font-semibold text-foreground">
//                         No Preview Available
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         Upload your resume to see the preview
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeAnalyzer;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Award, Brain, Download, FileText, Sparkles } from "lucide-react";

// import type { AnalyzeResumeOutput } from "@/ai/flows/resume-scoring";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OverallScoreCard } from "../_components/analysis/overall-score-card";
import { MetricsGrid } from "../_components/analysis/metrics-grid";
import { Recommendations } from "../_components/analysis/recommendations";
import { AnalysisSummary } from "../_components/analysis/analysis-summary";
import { PremiumUpgradeCard } from "../_components/analysis/premium-card";
import ResumePreview from "../_components/analysis/resume-preview";
import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
// import { OverallScoreCard } from "@/components/analysis/overall-score-card";
// import { MetricsGrid } from "@/components/analysis/metrics-grid";
// import { Recommendations } from "@/components/analysis/recommendations";
// import { AnalysisSummary } from "@/components/analysis/analysis-summary";
// import { PremiumUpgradeCard } from "@/components/analysis/premium-card";
// import ResumePreview from "@/components/analysis/resume-preview";

// type AiReport = AnalyzeResumeOutput & { [key: string]: any };

export default function ResumeAnalysisPage() {
  const { recordId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // console.log("aiReport", aiReport);

  useEffect(() => {
    if (!recordId) return;

    const getResumeAnalysisResponse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/history?recordId=${recordId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch resume analysis");
        }
        const data = await res.json();
        setPdfUrl(data?.metaData);
        setAiReport(data?.content);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching resume analysis:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getResumeAnalysisResponse();
  }, [recordId]);

  return (
    <div className="min-h-screen bg-background">
      {/* <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground font-headline">
                  Resume Clarity
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Analysis
                </p>
              </div>
            </Link>
            <Button
              variant="outline"
              className="hidden sm:flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              AI Powered
            </Button>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <div className="text-center py-20">
            <p className="text-destructive font-semibold">Error: {error}</p>
            <Button asChild className="mt-4">
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground font-headline">
                  Analysis Results
                </h2>
              </div>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                onClick={() => setOpen(true)}
              >
                Re-analiyze <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
            {isLoading ? (
              <>
                <Skeleton className="h-64 w-full rounded-xl" />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                </div>
              </>
            ) : (
              aiReport && (
                <>
                  <OverallScoreCard report={aiReport} />
                  <MetricsGrid sections={aiReport.sections} />
                  <Recommendations tips={aiReport.tips_for_improvement} />
                  <AnalysisSummary
                    strengths={aiReport.whats_good}
                    weaknesses={aiReport.needs_improvement}
                  />
                  <PremiumUpgradeCard />
                </>
              )
            )}
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground font-headline flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Resume Preview
              </h2>
              {!isLoading && pdfUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={pdfUrl} download target="_blank">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Link>
                </Button>
              )}
            </div>
            <div className="w-full h-[400px] sm:h-[600px] lg:h-[800px] xl:h-[900px]">
              <ResumePreview url={pdfUrl} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <ResumeUploadDialog open={open} onOpenChange={(open) => setOpen(false)} />
    </div>
  );
}
