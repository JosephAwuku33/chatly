"use client";
import Login from "../screens/login/page";
import { useAuthentication } from "../hooks/useAuthentication";

export default function RootNavigation() {
  const { user } = useAuthentication();
  return <>{user ? <div>You are not logged in</div> : <Login />}</>;
}
