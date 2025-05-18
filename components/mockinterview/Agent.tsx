"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import avator from "../../assets/ai-avatar.png";
import user from "../../assets/jobseeker.jpg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { Button } from "../ui/button";
import { interviewer } from "@/utils/constants";
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

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
  imageUrl,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [localQuestions, setLocalQuestions] = useState<string[]>(
    questions ?? []
  );
  const [localInterviewId, setLocalInterviewId] = useState<string | undefined>(
    interviewId
  );

  console.log("in agent componet", userId);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);
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

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("Generate feedback here");

    // create server action that generate feedback

    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
    });
    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("Error saving feedback");
      router.push("/interview");
    }
  };

  useEffect(() => {
    console.log("isSpeaking:", isSpeaking);
  }, [isSpeaking]);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/interview");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, userId, router]);

  const handleCall = async () => {
    if (!userId) {
      console.error("User ID is required to start the call.");
      return;
    }

    setCallStatus(CallStatus.CONNECTING);

    let generatedQuestions: string[] = localQuestions;
    let newInterviewId: string | undefined = localInterviewId;

    if (type === "generate") {
      try {
        const res = await fetch("/api/vapi/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "technical", // Optionally make dynamic
            role: "Frontend Developer",
            level: "Junior",
            techstack: "React, TypeScript",
            amount: 5,
            userId,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("Interview generation failed:", data.error);
          return;
        }

        generatedQuestions = data.interview.questions;
        newInterviewId = data.interview.id;

        setLocalQuestions(generatedQuestions);
        setLocalInterviewId(newInterviewId);
      } catch (err) {
        console.error("Interview generation error:", err);
        return;
      }

      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
        clientMessages: [],
        serverMessages: [],
      });
    } else {
      let formattedQuestions = "";
      if (localQuestions.length > 0) {
        formattedQuestions = localQuestions.map((q) => `- ${q}`).join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: { questions: formattedQuestions },
        clientMessages: [],
        serverMessages: [],
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-center bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] w-full h-full px-4 py-6 rounded-lg">
        {/* AI Interviewer Card */}
        <div className="flex flex-col items-center gap-2 p-7 bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 sm:w-1/3 w-full border-primary-200/50">
          <div className="relative size-[120px] rounded-full bg-gradient-to-l from-white to-[#CAC5FE] flex items-center justify-center">
            {isSpeaking && (
              <span className="absolute h-full w-full rounded-full bg-purple-200 opacity-75 animate-ping z-0" />
            )}
            <Image
              src={avator}
              alt="vapi"
              width={65}
              height={54}
              className="relative z-10 object-cover"
            />
          </div>

          <h3 className="text-white text-center pt-5">AI Interviewer</h3>
        </div>

        {/* User Profile Card (hidden on small screens) */}
        <div className="hidden sm:block bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 w-1/3 rounded-2xl">
          <div className="flex flex-col gap-2 justify-center bg-gradient-to-b from-[#1A1C20] to-[#08090D] items-center p-7 rounded-2xl min-h-full">
            <Image
              src={imageUrl || user}
              alt="user avatar"
              width={540}
              height={540}
              className="object-cover rounded-full size-[120px]"
            />
            <h3 className="text-white text-center pt-5">{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-full text-white">
          <div className="bg-gradient-to-b from-[#1a1c209d] to-[#08090D] rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
            <p
              key={latestMessage}
              className={cn(
                " transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}>
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <Button
            onClick={handleCall}
            className="relative inline-block px-7 font-bold text-sm leading-5 text-white transition-colors  duration-150 bg-green-700 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible;">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>{isCallInactiveOrFinished ? "Call" : "Say Hello"}</span>
          </Button>
        ) : (
          <Button
            onClick={handleDisconnect}
            className="inline-block px-7 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-red-500 text-center mx-auto border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28;">
            End
          </Button>
        )}
      </div>
    </>
  );
};

export default Agent;
