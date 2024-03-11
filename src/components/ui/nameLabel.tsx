"use client";
import { useAuth } from "@/app/context/AuthContext";

export default function NameLabel() {
  const { user } = useAuth();

  return (
    <div>
      <label className="text-green-950">{user?.displayName}</label>
    </div>
  );
}
