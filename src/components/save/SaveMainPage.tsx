"use client";

import { useAuthStore } from "@/store/auth/authStore";

interface SaveMainPageProps {
  guest: React.ReactNode;
  authenticated: React.ReactNode;
}

export default function SaveMainPage({
  guest,
  authenticated,
}: SaveMainPageProps) {
  const { accessToken } = useAuthStore();
  
  return (
    <>
      {accessToken ? authenticated : guest}
    </>
  );
}
