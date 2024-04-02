"use client";
// import NameLabel from "@/components/ui/nameLabel";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SideBar } from "@/components/ui/sidebar";
import { ChatArea } from "@/components/ui/chatArea";


const HomePage = () => {
  const isAuthenticated = useLocalStorage("isAuthenticated");
  const router = useRouter();


  useEffect(() => {
    if ( !isAuthenticated){
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-row h-screen bg-[#090909]">
      <SideBar/>
      <ChatArea/>
    </div>
  );
};

export default HomePage;
