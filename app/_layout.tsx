import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import "../global.css";

export default function Rootlayout() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{headerShown: false, animation: 'none'}} />
    </AuthContextProvider>
  );
}
