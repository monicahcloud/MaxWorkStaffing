"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import user from "../../assets/jobseeker.jpg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { Button } from "../ui/button";
import { createFeedback } from "@/utils/actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  clerkId?: string;
  interviewId: string;
  questions?: string[];
  imageUrl?: string;
  role?: string;
  level?: string;
  industry?: string;
}

const Agent = ({
  userName,
  clerkId,
  interviewId,
  questions,
  imageUrl,
  role,
  level,
  industry,
}: AgentProps) => {
  const router = useRouter();

  // Core UI state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedFeedback, setHasGeneratedFeedback] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Keep fresh values available inside event listeners
  const messagesRef = useRef<SavedMessage[]>([]);
  const hasStartedCallRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Derived state for cleaner UI logic
  const isIdle = callStatus === CallStatus.INACTIVE;
  const isConnecting = callStatus === CallStatus.CONNECTING;
  const isActive = callStatus === CallStatus.ACTIVE;
  const isFinished = callStatus === CallStatus.FINISHED;

  const canStart = isIdle || isFinished;
  const canFinish = isActive;

  const statusLabel = isActive
    ? "Live Now"
    : isConnecting
      ? "Connecting"
      : isGenerating
        ? "Processing"
        : "Ready";

  /**
   * Register VAPI listeners once.
   */
  useEffect(() => {
    const onCallStart = () => {
      console.log("VAPI: call-start");
      hasStartedCallRef.current = true;
      setCallStatus(CallStatus.ACTIVE);
      setErrorMessage("");
    };

    const onCallEnd = () => {
      console.log("VAPI: call-end");
      console.log("Transcript messages captured:", messagesRef.current);
      setCallStatus(CallStatus.FINISHED);
      setIsSpeaking(false);
      setLiveTranscript("");
    };

    const onMessage = (message: any) => {
      console.log("VAPI message:", message);

      if (message.type !== "transcript") return;

      // Show partial transcript live while current speaker is talking
      if (message.transcriptType === "partial") {
        setLiveTranscript(message.transcript || "");
        return;
      }

      // Save final transcript chunks permanently
      if (message.transcriptType === "final") {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [...prev, newMessage]);
        setLiveTranscript("");
      }
    };

    const onSpeechStart = () => {
      console.log("VAPI: speech-start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("VAPI: speech-end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error("VAPI error:", error);
      setErrorMessage(
        "The interview session could not start or continue properly. Please try again.",
      );
      setCallStatus(CallStatus.INACTIVE);
      setIsGenerating(false);
      setIsSpeaking(false);
      setLiveTranscript("");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  /**
   * Create feedback after a real interview has occurred.
   */
  const handleGenerateFeedback = async (transcriptMessages: SavedMessage[]) => {
    if (!interviewId || !clerkId) {
      console.error(
        "Missing interview ID or clerk ID for feedback generation.",
      );
      router.push("/interview");
      return;
    }

    try {
      setIsGenerating(true);

      const result = await createFeedback({
        interviewId,
        clerkId,
        transcript: transcriptMessages,
      });

      if (result.success && result.feedbackId) {
        router.push(`/interview/${interviewId}/feedback`);
        return;
      }

      console.error("Error saving feedback", result);
      setErrorMessage("Feedback generation failed. Please try again.");
      router.push("/interview");
    } catch (error) {
      console.error("Unexpected feedback generation error:", error);
      setErrorMessage("Something went wrong while generating feedback.");
      router.push("/interview");
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Once the call ends, only generate feedback if the user actually responded.
   */
  useEffect(() => {
    if (callStatus !== CallStatus.FINISHED) return;
    if (hasGeneratedFeedback) return;
    if (!hasStartedCallRef.current) return;

    const hasRealConversation = messages.some(
      (msg) => msg.role === "user" && msg.content.trim().length > 0,
    );

    if (!hasRealConversation) {
      console.warn(
        "Call ended before any real interview response was captured.",
      );
      setErrorMessage(
        "The interview ended before it could begin properly. Please try again.",
      );
      setCallStatus(CallStatus.INACTIVE);
      return;
    }

    setHasGeneratedFeedback(true);
    handleGenerateFeedback(messages);
  }, [callStatus, hasGeneratedFeedback, messages]);

  /**
   * Start the live interview session with the VAPI assistant ID.
   */
  const handleCall = async () => {
    if (!clerkId) {
      console.error("Clerk ID is required to start the call.");
      setErrorMessage("You must be signed in to start the interview.");
      return;
    }

    setMessages([]);
    setLiveTranscript("");
    setErrorMessage("");
    setCallStatus(CallStatus.CONNECTING);
    setHasGeneratedFeedback(false);
    hasStartedCallRef.current = false;

    try {
      const formattedQuestions =
        questions && questions.length > 0
          ? questions.map((q) => `- ${q}`).join("\n")
          : "";

      console.log(
        "Starting VAPI interview with questions:",
        formattedQuestions,
      );
      console.log("User:", userName, clerkId);

      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
        variableValues: {
          questions: formattedQuestions,
          username: userName,
          role: role || "candidate",
          level: level || "mid-level",
          industry: industry || "general",
        },
      });
    } catch (err) {
      console.error("Interview start error:", err);
      setErrorMessage("We could not start the interview. Please try again.");
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  /**
   * End the interview manually.
   */
  const handleDisconnect = () => {
    console.log("User clicked finish interview");
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;

  return (
    <div className="space-y-6">
      {/* Main shell */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#4B4D4F]/30 to-[#4B4D4F10] p-4 md:p-6">
        {/* Session controls + instructions */}
        <div className="mb-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-5 text-white">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Interview Session
              </p>

              <h3 className="text-2xl font-semibold">
                {isActive
                  ? "You’re live with Thyri"
                  : isConnecting
                    ? "Connecting your session"
                    : isGenerating
                      ? "Analyzing your responses"
                      : "Start when you’re ready"}
              </h3>

              <p className="max-w-2xl text-sm text-slate-300">
                {isActive
                  ? "Thyri is leading the interview now. Wait for her to finish each question, then answer naturally. When you are ready to end the session, click Finish and Generate Feedback."
                  : isConnecting
                    ? "Please wait while we connect you to Thyri."
                    : isGenerating
                      ? "Please hold on while your personalized feedback report is being prepared."
                      : "Press Start with Thyri to begin. Thyri will introduce herself first. After she finishes speaking, answer out loud as if this were a real interview."}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {canStart ? (
                <Button
                  onClick={handleCall}
                  disabled={isGenerating || isConnecting}
                  className="min-w-[240px] rounded-full bg-green-700 px-8 py-6 text-base font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70">
                  {isConnecting
                    ? "Connecting..."
                    : isGenerating
                      ? "Processing..."
                      : "Start with Thyri"}
                </Button>
              ) : canFinish ? (
                <Button
                  onClick={handleDisconnect}
                  disabled={isGenerating}
                  className="min-w-[240px] rounded-full bg-red-500 px-8 py-6 text-base font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70">
                  Finish and Generate Feedback
                </Button>
              ) : null}

              <div className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                <span
                  className={cn(
                    "mr-2 h-2.5 w-2.5 rounded-full",
                    isActive
                      ? "bg-emerald-400 animate-pulse"
                      : isConnecting
                        ? "bg-amber-400 animate-pulse"
                        : isGenerating
                          ? "bg-cyan-400 animate-pulse"
                          : "bg-slate-500",
                  )}
                />
                {statusLabel}
              </div>
            </div>
          </div>

          {/* User help banner */}
          <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-100">
            Wait for Thyri to finish speaking, then answer naturally. When you
            are done with the interview, click{" "}
            <span className="font-semibold">Finish and Generate Feedback</span>.
          </div>

          {/* Error banner */}
          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Interviewer + candidate panels */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#171532] to-[#08090D] p-8 text-white">
            <div className="relative flex flex-col items-center text-center">
              <div className="relative flex size-[132px] items-center justify-center rounded-full bg-gradient-to-l from-white to-[#CAC5FE]">
                {isSpeaking && (
                  <span className="absolute inset-0 rounded-full bg-purple-300/40 animate-ping" />
                )}
                <Image
                  src="/ai-avatar.png"
                  alt="AI interviewer"
                  width={72}
                  height={60}
                  className="relative z-10 object-contain"
                />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-slate-400">
                Thyri
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                AI Interview Coach
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                Thyri will introduce herself first, then guide you through the
                interview one question at a time.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1A1C20] to-[#08090D] p-8 text-white">
            <div className="relative flex flex-col items-center text-center">
              <Image
                src={imageUrl || user}
                alt="user avatar"
                width={132}
                height={132}
                className="size-[132px] rounded-full object-cover ring-2 ring-white/10"
              />

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-slate-400">
                Candidate
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{userName}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                Focus on clarity, confidence, and real-world examples. The goal
                is progress, not perfection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live transcript */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#4B4D4F]/30 to-[#4B4D4F10] p-4">
        <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-[#1a1c20d9] to-[#08090D] p-5 text-white">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Live Transcript
              </p>
              <h4 className="mt-1 text-lg font-semibold">Current Response</h4>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  isSpeaking ? "bg-emerald-400 animate-pulse" : "bg-slate-500",
                )}
              />
              <span>{isSpeaking ? "Speaking" : "Waiting"}</span>
            </div>
          </div>

          <div className="flex min-h-[110px] items-center rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4">
            {liveTranscript ? (
              <p className="text-base leading-8 text-slate-200">
                {liveTranscript}
              </p>
            ) : messages.length > 0 ? (
              <p
                key={latestMessage}
                className={cn(
                  "text-base leading-8 text-slate-200 opacity-0 transition-opacity duration-500",
                  "animate-fadeIn opacity-100",
                )}>
                {latestMessage}
              </p>
            ) : (
              <p className="text-slate-400">
                Thyri will introduce herself first. When she finishes speaking,
                answer out loud. Your live transcript will appear here.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Feedback processing state */}
      {isGenerating && (
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center text-cyan-100">
          Generating your feedback report...
        </div>
      )}
    </div>
  );
};

export default Agent;
