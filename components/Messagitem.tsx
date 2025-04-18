import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Messagitem = ({ message, index, currentUser }: any) => {
  let second = message?.createsAt?.seconds;
  let date = new Date(second * 1000);

  let hour = date.getHours();
  let minute = date.getMinutes();

  if (currentUser?.userId == message?.userId) {
    return (
      <View className="flex-row justify-start mb-3 ml-5">
        <View style={{ width: wp(80) }}>
          <View className="flex-col relative self-start p-3 rounded-2xl border border-neutral-200 shadow rounded-tl-none bg-[#7035a5]">
            <Text style={{ fontSize: hp(1.9) }} className="text-neutral-50">
              {message?.text}
            </Text>
            <View className="flex justify-end items-end">
              <Text style={{ fontSize: hp(1) }} className="text-white">
                {hour}:{minute}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-row justify-end mb-3 mr-5">
        <View style={{ width: wp(80) }}>
          <View className="flex-col-reverse relative self-end p-3 border rounded-2xl rounded-tr-none shadow bg-white">
            <View className="flex justify-end items-end">
              <Text style={{ fontSize: hp(1) }} className="text-black">
                {hour}:{minute}
              </Text>
            </View>
            <Text style={{ fontSize: hp(1.9) }} className="text-neutral-700">
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default Messagitem;

const styles = StyleSheet.create({});
