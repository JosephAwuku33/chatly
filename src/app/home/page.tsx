"use client";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SideBar } from "@/components/ui/sidebar";
import { ChatArea } from "@/components/ui/chatArea";
import ResponsiveContext from "../context/ResponsiveContext";


const HomePage = () => {
  const isAuthenticated = useLocalStorage("isAuthenticated");
  const router = useRouter();
  const { isMobile } = useContext(ResponsiveContext);

  console.log(`The value of context is ${isMobile}`)


  useEffect(() => {
    if ( !isAuthenticated){
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen bg-[#090909]">
      <SideBar/>
      <ChatArea/>
    </div>
  );
};

export default HomePage;
