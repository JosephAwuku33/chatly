"use client";
import Login from "@/app/login/page";
import HomePage from "@/app/home/page";
import useLocalStorage from "../hooks/useLocalStorage";


export default function RootNavigation() {
  const isAuthenticated = useLocalStorage("isAuthenticated");
  console.log(isAuthenticated);
  return <> { isAuthenticated ? <HomePage /> : <Login />} </>;
}
