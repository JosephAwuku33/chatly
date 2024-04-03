"use client";
import Image from "next/image";
import profile from "../../../public/profile.svg";
import React, { useState, useEffect, useContext } from "react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase-config";
import { useAuth } from "@/app/context/AuthContext";
import { useChat, ChatContext } from "@/app/context/ChatContext";

export function MessagesList() {
  const [chats, setChats] = useState<any | null | undefined>([]);
  const { user } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc (db, "userChats", user!.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user?.uid && getChats();
  }, [user, user?.uid]);

  const handleSelect = (u: any) => {
    dispatch({type: "CHANGE_USER", payload: u})
  };

  


  
  return (
    <div className="flex mt-3 border-0 border-gray-300 p-1 flex-col space-y-4 overflow-y-auto">
      
      {Object.entries(chats as ArrayLike<any>)?.sort((a, b) => b[1]?.date - a[1]?.date).map((chat) => (
        <div
          key={chat[0]}
          onClick={() => chat[1].userInfo && handleSelect(chat[1].userInfo)}
          className="flex items-start bg-[#141414] justify-start cursor-pointer hover:bg-slate-600 overflow-hidden space-x-1 p-2 rounded-md"
        >
          
          <Image src={profile} alt="Profile" width={60} height={60} />
          <div className="flex gap-1 p-2 mx-auto flex-col">
            <div className="font-semibold  text-green-950">
              {chat[1] && chat[1].userInfo.displayName}
            </div>
            <div className="line-clamp-1 text-sm text-gray-300">
              {chat[1] && chat[1].lastMessage?.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
