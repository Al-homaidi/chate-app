import {
  Alert,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import Loding from "@/components/loading";
import ViewWithkeyboard from "@/components/viewWithkeyboard";
import { useAuth } from "@/context/authContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import SingupSvg from "@/assets/images/signup.svg";

const singup = () => {
  const route = useRouter();
  const [openeye, setopeneye] = useState(false);
  const [islaoding, setisloding] = useState(false);
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setisloding(true);

    const respons: any = await register(
      data.email,
      data.password,
      data.username,
      data.urlimage
    );

    setisloding(false);

    if (respons.success) {
      // console.log('تم تسجيل المستخدم:', respons.data);
    } else {
      // console.log('فشل التسجيل:', respons.msg);
      Alert.alert("Erore", respons.msg);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#fff" }}>
      <StatusBar barStyle={"dark-content"} />
      <ViewWithkeyboard>
        <View style={{ paddingHorizontal: wp(5) }}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            className="items-center"
          >
            <SingupSvg
              style={{ marginBottom: 20 }}
              width={hp(35)}
              height={hp(35)}
            />
          </Animated.View>

          <View className="gap-5">
            <Animated.View
              entering={FadeInDown.duration(700)}
              className="gap-1 justify-between"
            >
              <View
                className={`flex-row bg-neutral-200 gap-4 justify-between items-center rounded-xl ${
                  Platform.OS === "ios" ? "p-4" : "py-1 px-4"
                }`}
              >
                <Feather color={"gray"} name="user" size={hp(2.7)} />
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: "Please enter your Username" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChangeText={onChange}
                      value={value}
                      style={{ fontSize: hp(2), height: Platform.OS === 'ios' ? hp(1.5) : hp(5.5) }}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="Enter your Username"
                      placeholderTextColor="gray"
                    />
                  )}
                />
              </View>
              {errors.username?.message && (
                <Text
                  className="text-start ms-2"
                  style={{ color: "red", fontSize: hp(1.1), marginTop: 4 }}
                >
                  {String(errors.username.message)}
                </Text>
              )}
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(800)}
              className="gap-1 justify-between"
            >
              <View
                className={`flex-row bg-neutral-200 gap-4 justify-between items-center rounded-xl ${
                  Platform.OS === "ios" ? "p-4" : "py-1 px-4"
                }`}
              >
                <Octicons color={"gray"} name="mail" size={hp(2.7)} />
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Please enter your email",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "The email is not right",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChangeText={onChange}
                      value={value}
                      style={{ fontSize: hp(2), height: Platform.OS === 'ios' ? hp(1.5) : hp(5.5) }}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="Enter your Email"
                      placeholderTextColor="gray"
                    />
                  )}
                />
              </View>
              {errors.email?.message && (
                <Text
                  className="text-start ms-2"
                  style={{ color: "red", fontSize: hp(1.1), marginTop: 4 }}
                >
                  {String(errors.email.message)}
                </Text>
              )}
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(900)}
              className="gap-4"
            >
              <View className="gap-1 justify-between">
                <View
                  className={`flex-row bg-neutral-200 gap-4 justify-between items-center rounded-xl ${
                    Platform.OS === "ios" ? "p-4" : "py-1 px-4"
                  }`}
                >
                  <Octicons color={"gray"} name="lock" size={hp(2.7)} />
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Please enter your password" }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        secureTextEntry={!openeye}
                        onChangeText={onChange}
                        value={value}
                        style={{ fontSize: hp(2), height: Platform.OS === 'ios' ? hp(1.5) : hp(5.5) }}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Enter your Password"
                        placeholderTextColor="gray"
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      openeye ? setopeneye(false) : setopeneye(true)
                    }
                  >
                    <Octicons
                      size={hp(2)}
                      name={openeye ? "eye-closed" : "eye"}
                      color={"gray"}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password?.message && (
                  <Text
                    className="text-start ms-2"
                    style={{ color: "red", fontSize: hp(1.1), marginTop: 4 }}
                  >
                    {String(errors.password.message)}
                  </Text>
                )}
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1000)}
              className="gap-1 justify-between"
            >
              <View
                className={`flex-row bg-neutral-200 gap-4 justify-between items-center rounded-xl ${
                  Platform.OS === "ios" ? "p-4" : "py-1 px-4"
                }`}
              >
                <Octicons color={"gray"} name="image" size={hp(2.7)} />
                <Controller
                  control={control}
                  name="urlimage"
                  rules={{ required: "Please enter your Urlimage" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChangeText={onChange}
                      value={value}
                      style={{ fontSize: hp(2), height: Platform.OS === 'ios' ? hp(1.5) : hp(5.5) }}
                      className="flex-1 font-semibold text-neutral-700"
                      placeholder="Enter your Urlimage"
                      placeholderTextColor="gray"
                    />
                  )}
                />
              </View>
              {errors.urlimage?.message && (
                <Text
                  className="text-start ms-2"
                  style={{ color: "red", fontSize: hp(1.1), marginTop: 4 }}
                >
                  {String(errors.urlimage.message)}
                </Text>
              )}
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1100)}>
              {islaoding ? (
                <View className="flex-row justify-center">
                  <Loding />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={{ backgroundColor: "#7035a5" }}
                  className="mt-5 p-5 rounded-2xl"
                >
                  <Text
                    style={{ fontSize: hp(2.4) }}
                    className="text-center text-white"
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1200)}
              className="mt-1 ms-2 flex-row justify-center"
            >
              <Text
                style={{ fontSize: hp(1.7) }}
                className="text-neutral-500 font-semibold"
              >
                You have an acount?{" "}
              </Text>
              <Pressable onPress={() => router.navigate("/(app)/home")}>
                <Text
                  style={{ fontSize: hp(1.7), color: "#7035a5" }}
                  className="underline decoration-4 font-bold"
                >
                  {" "}
                  Singin
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </ViewWithkeyboard>
    </SafeAreaView>
  );
};

export default singup;

const styles = StyleSheet.create({});
