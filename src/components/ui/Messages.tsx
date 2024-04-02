"use client";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase-config";
import Message from "./message";
import { useChat } from "@/app/context/ChatContext";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useChat();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  
  return (
    <div className="bg-black p-4 overflow-scroll h-[calc(100%-160px)]">
        {messages.map((m: any) => (
            <Message message={m} key={m!.id}/>
        ))}
    </div>
  )
}

export default Messages;
