import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="singin" options={{ headerShown: false }} />
      <Stack.Screen name="singup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
