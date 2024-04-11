"use client";
import React, { useContext } from "react";
import { ChatContext } from "@/app/context/ChatContext";
import { LogOutButton } from "./logoutbtn";
import Image from "next/image";
import { ChatInput } from "./chatInput";
import Messages from "./Messages";
import nfp from "../../../public/nfp.svg";

export default function MobileChatArea() {
  const { data } = useContext(ChatContext);
  console.log(data.user.displayName);

  return (
    <div className="h-screen p-3 w-full border-l-2 border-gray-400">
      <div className="flex items-start justify-between w-full h-20 p-2 mt-2 bg-black rounded">
        <div className="flex flex-row justify-start items-start gap-1">
          <Image src={nfp} alt="Profile" width={60} height={60} />
          <div className="flex gap-1 flex-col">
            <div className="font-semibold text-sm md:text-lg  text-white">
              {data?.user.displayName}
            </div>
            <div className="line-clamp-1 text-xs md:text-sm text-gray-300">Online</div>
          </div>
        </div>

        <LogOutButton />
      </div>
      <>
        <Messages />
      </>
      <div className="fixed bottom-0 w-full md:mx-5 mb-2">
        <ChatInput />
      </div>
    </div>
  );
}
