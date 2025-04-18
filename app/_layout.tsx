import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import "../global.css";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

const MainLaout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      router.push("/(app)/home");
    } else if (isAuthenticated == false) {
      router.push("/");
    }
  }, [isAuthenticated]);

  if (typeof isAuthenticated === "undefined") {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7035A5" />
      </View>
    );
  }

  return <Slot />;
};

export default function Rootlayout() {
  return (
    <AuthContextProvider>
      <MainLaout />
    </AuthContextProvider>
  );
}
