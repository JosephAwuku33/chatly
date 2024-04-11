"use client";
import { useContext, useEffect } from "react";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import MobileChatArea from "@/components/ui/mobileChatArea";
import ResponsiveContext from "@/app/context/ResponsiveContext";

const MobileChatAreaPage = () => {
  const isAuthenticated = useLocalStorage("isAuthenticated");
  const router = useRouter();
  const { isMobile } = useContext(ResponsiveContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }

    if ( !isMobile ) {
      router.replace("/home")
    }
  }, [isAuthenticated, router, isMobile]);

  return (
    <div className="flex h-screen bg-[#090909]">
      <MobileChatArea/>
    </div>
  );
};

export default MobileChatAreaPage;
