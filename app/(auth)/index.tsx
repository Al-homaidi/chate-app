import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Redirect, router, useRouter } from "expo-router";
import Welcom from "@/assets/images/chat.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { useAuth } from "@/context/authContext";

const index = () => {

  const isAthenticated = useAuth();
  
  if (isAthenticated) {
    <Redirect href={'/(app)/home'} />
  }
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.Image
        entering={FadeInRight.duration(700)}
        className="absolute top-0 left-[-30]"
        source={require("../../assets/images/main_top.png")}
      />
      <Animated.View className={`${Platform.OS === "ios" ? "" : "pt-10"}`}>
        <TouchableOpacity onPress={() => router.push("/(app)/home")}>
          <Text
            style={{ color: "#7035a5" }}
            className="font-bold shadow-slate-400 text-right mx-4 text-lg"
          >
            Sing In
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View className="flex-1 justify-center">
        <Animated.View
          entering={FadeInUp.duration(500)}
          className="flex pb-10 mb-10 pt-10 items-center"
        >
          <Welcom />
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(500)}>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/singup")}
            className="mt-5 p-5 rounded-2xl mx-4"
            style={{ backgroundColor: "#7035a5" }}
          >
            <Text
              style={{ fontSize: hp(2.4) }}
              className="text-center text-white"
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Image
        className="absolute bottom-[-150] left-[-10]"
        source={require("../../assets/images/main_bottom.png")}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
