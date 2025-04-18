import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "@/utils/blurhash";

const ChatpageHeader = ({ user, router }: any) => {
  //   console.log(user);
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row gap-4 items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome6
                color={"#737373"}
                size={hp(3)}
                name="chevron-left"
              />
            </TouchableOpacity>
            <View className="flex-row gap-2 justify-between items-center">
              <Image
                source={user?.profileimg}
                placeholder={blurhash}
                contentFit="cover"
                transition={500}
                style={{
                  width: hp(4),
                  height: hp(4),
                  aspectRatio: 1,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{ fontSize: hp(2) }}
                className="text-neutral-500 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <TouchableOpacity>
              <Ionicons name="call" size={hp(2.8)} color={"#737373"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam" size={hp(2.8)} color={"#737373"} />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default ChatpageHeader;

const styles = StyleSheet.create({});
