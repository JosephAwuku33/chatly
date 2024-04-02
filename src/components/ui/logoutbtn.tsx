"use client";
import { auth } from "@/app/firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function LogOutButton() {
  const router = useRouter();
  const handleLogOuT = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      router.push("/login");
      console.log("succesfully signed out");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={handleLogOuT}
      className="rounded mt-2 p-3 bg-red-600 hover:bg-red-950 text-white "
    >
      Sign Out
    </button>
  );
}
