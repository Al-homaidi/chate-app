import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { useAuth } from "@/context/authContext";
import { blurhash } from "@/utils/blurhash";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MenuOption from "./CustomMenuOption";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
const Hedar = () => {
  const { user, logout } = useAuth();

  const handlelgout = async () => {
    await logout();
  };

  function shaowProfile() {
    console.log("shaodw");
  }
  return (
    <View
      style={{ backgroundColor: "#7035a5", height: hp(12) }}
      className="flex-row items-end justify-between px-5 pb-5 rounded-b-3xl shadow"
    >
      <Text className="text-white font-bold shadow-slate-400 text-2xl">
        Chats
      </Text>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              source={user?.profileUrl}
              placeholder={blurhash}
              contentFit="cover"
              transition={500}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 5,
                marginTop: 60,
              },
              optionWrapper: {
                padding: 10,
              },
              optionText: {
                fontSize: 16,
                color: "#7035a5",
              },
            }}
          >
            <MenuOption
              text="Profile"
              action={shaowProfile}
              value={null}
              iocn={
                <FontAwesome6 name="circle-user" color="#737373" size={hp(2)} />
              }
            />
            <Divider />
            <MenuOption
              text="Logout"
              action={handlelgout}
              value={null}
              iocn={
                <MaterialIcons name="logout" color="#737373" size={hp(2)} />
              }
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default Hedar;

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200"></View>;
};

const styles = StyleSheet.create({});
