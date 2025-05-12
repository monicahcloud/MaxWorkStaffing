import Image from "next/image";
import React from "react";
import avator from "../../assets/ai-avatar.png";
import user from "../../assets/jobseeker.jpg";
//import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

const Agent = ({ userName }: AgentProps) => {
  // const callStatus = CallStatus.FINISHED;
  const isSpeaking = true;
  const messages = [
    "Whats your name?",
    "My name is John Doe, nice to meet you!",
  ];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="flex sm:flex-row flex-col h-1/2 gap-5 items-center justify-center bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]  w-full">
        {/* AI Interviewer Card */}
        <div className="flex-center flex-col gap-2 p-7 bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 w-1/3 border-primary-200/50 ">
          <div className="z-10 flex items-center justify-center mx-auto bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[120px] relative">
            <Image
              src={avator}
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && (
              <span className="absolute inline-flex size-5/6 animate-ping rounded-full bg-primary-200 opacity-75" />
            )}
          </div>
          <h3 className="text-white items-center text-center pt-5">
            AI Interviewer
          </h3>
        </div>
        {/* User Profile Card */}
        <div className=" bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5   w-1/3 rounded-2xl ">
          <div className="flex flex-col gap-2 justify-center bg-gradient-to-b from-[#1A1C20] to-[#08090D] items-center p-7 rounded-2xl min-h-full">
            <Image
              src={user}
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
          <div className="bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
            <p
              key={lastMessage}
              className={cn(
                " transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}>
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      {/* <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <Button className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors  duration-150 bg-green-700 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible;">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                (callStatus !== "CONNECTING") & "hidden"
              )}
            />
            <span>
              {" "}
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </Button>
        ) : (
          <Button className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28;">
            End
          </Button>
        )}
      </div> */}
    </>
  );
};

export default Agent;
