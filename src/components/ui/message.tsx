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
      <div className="flex flex-col bg-gray-600 text-white">
        <span className="text-xs">just now</span>
      </div>
      <div className="flex items-end">
        <p className="text-white rounded p-3 bg-green-950">{message.text}</p>
        <Image src={nopfp} alt="profile" width={30} height={30} />
      </div>
    </div>
  );
};

export default Message;
