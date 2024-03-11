"use client";
import { LogOutButton } from "@/components/ui/logoutbtn";
import NameLabel from "@/components/ui/nameLabel";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const isAuthenticated = useLocalStorage("isAuthenticated");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated){
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  return (
    <main className="flex items-center flex-col gap-3 justify-center h-screen bg-[#141414]">
      <NameLabel />
      <LogOutButton />
    </main>
  );
};

export default HomePage;
