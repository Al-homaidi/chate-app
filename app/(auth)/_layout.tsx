import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/authContext";

const _layout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(app)/home" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
};

export default _layout;

const styles = StyleSheet.create({});
