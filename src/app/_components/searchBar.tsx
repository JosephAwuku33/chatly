"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase-config";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import nopfp from "../../../public/nfp.svg";
import ResponsiveContext from "@/app/context/ResponsiveContext";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [username, setUsername] = useState<string>("");
  const [userToBeSet, setUserToBe] = useState<DocumentData | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const { isMobile } = useContext(ResponsiveContext);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("isMobile updated:", isMobile);
  }, [isMobile]); // Log whenever isMobile changes


  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserToBe(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user!.uid > userToBeSet?.uid
        ? user!.uid + userToBeSet?.uid
        : userToBeSet?.uid + user!.uid;

    console.log(combinedId);

    if ( isMobile ){
      router.push("/chat");
    }
    
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(user?.uid);
      console.log(userToBeSet?.uid);
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user?.uid as string), {
          [combinedId + ".userInfo"]: {
            uid: userToBeSet!.uid,
            displayName: userToBeSet!.username,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userToBeSet?.uid), {
          [combinedId + ".userInfo"]: {
            uid: user?.uid,
            displayName: user?.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        const updatedDoc = await getDoc(doc(db, "userChats", userToBeSet?.uid ));
        console.log(updatedDoc);
      }

      if ( isMobile ) {
        router.push("/home/chat");
      }
      
    } catch (err) {
      console.log(err);
    }

    setUserToBe(null);
    setUsername("");
    
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search others"
        onKeyDown={handleKey}
        onChange={(event) => {
          setUsername(event.target.value);
          setErr(false);
        }}
        className="bg-[#3C3C3C] text-white rounded w-full p-2"
        value={username}
      />
      {err && <span className="text-red-500 text-xs">User not found!</span>}
      {userToBeSet && (
        <div className="flex items-start bg-[#141414] justify-start cursor-pointer hover:bg-slate-600 overflow-hidden 
        space-x-1 p-2 rounded-md" onClick={handleSelect}>
          <Image src={nopfp} alt="profile pic" width={60} height={60} />
          <div className="flex gap-1 p-2 mx-auto flex-col">
            <div className="text-green-950 font-semibold ">{userToBeSet?.username}</div>
          </div>
        </div>
      )}
    </>
  );
}
