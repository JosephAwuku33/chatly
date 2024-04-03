"use client";
import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import nopfp from "../../../public/nfp.svg";
// import { useChat } from "@/app/context/ChatContext";

type MessageProps = {
  message: {
    text: string;
    senderId: string;
  };
};

const Message = ({ message }: MessageProps) => {
  const { user } = useAuth();
  // const data = useChat();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!ref.current) throw Error("divRef is not assigned");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-4 mb-4 ${message.senderId === user?.uid && "flex flex-row-reverse"}`}
    >
      {/* <div className="flex text-center p-3 rounded-lg bg-gray-600 text-white">
        <p className="text-xs">just now</p>
      </div> */}
      <div className="flex items-end">
        <p className="text-white rounded p-3 bg-green-800">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
