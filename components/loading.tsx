import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import LottieView from "lottie-react-native";
type size = any;

const loading = ({ size }: size) => {
  return (
    <View style={{ height: size, width: "20%", aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/images/Animation1744486861832.json")}
        resizeMode="cover"
        autoPlay
        loop
      />
    </View>
  );
};

export default loading;

const styles = StyleSheet.create({});
