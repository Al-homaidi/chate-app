import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MenuOption } from "react-native-popup-menu";

const CustomMenuOption = ({ text, iocn, action, value }: any) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="flex-row justify-between px-0 py-0 items-center">
        <Text className="text-black text-xl">{text}</Text>
        {iocn}
      </View>
    </MenuOption>
  );
};

export default CustomMenuOption;

const styles = StyleSheet.create({});
