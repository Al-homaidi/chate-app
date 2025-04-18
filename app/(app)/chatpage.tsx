import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import React, { Profiler, useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatpageHeader from "@/components/ChatpageHeader";
import MessagList from "@/components/MessagList";
import { StatusBar } from "react-native";
import { useAuth } from "@/context/authContext";
import { getRoomId } from "@/utils/blurhash";
import {
  addDoc,
  and,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/FirbaseConfig";
import { useHeaderHeight } from "@react-navigation/elements";

const Chatpage = () => {
  const headerHeight = Platform.OS === "ios" ? useHeaderHeight() : 0;
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setmessages] = useState<any | any>([]);
  const [textRer, settextRer] = useState("");
  const messagListRef = useRef<any>(null);
  const [isloding, setisloding] = useState(true);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createsAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let AllMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setmessages([...AllMessages]);
    });

    setTimeout(() => {
      setisloding(false);
    }, 100);

    const Kyebordshowlistener = Keyboard.addListener(
      "keyboardDidShow",
      handelScrol0
    );

    return () => {
      unsub();
      Kyebordshowlistener.remove();
    };
  }, [messages]);

  useEffect(() => {
    handelScrol0();
  }, []);

  const createRoomIfNotExists = async () => {
    const roomId: any = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handelSendMessag = async () => {
    let messag = textRer;
    if (!messag) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");

      settextRer("");
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: messag,
        ProfilerUrl: user?.profileUrl,
        senderName: user?.username,
        createsAt: Timestamp.fromDate(new Date()),
      });

      setTimeout(() => {
        handelScrol0();
      }, 100);
    } catch (e: any) {
      Alert.alert("Error", e.messag);
    }
  };

  const handelScrol0 = () => {
    messagListRef.current?.scrollToBottom();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <StatusBar barStyle={"dark-content"} />
        <ChatpageHeader user={item} router={router} />
        <View className="border-b border-neutral-300" />

        {isloding ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#7035A5" />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <View className="flex-1 justify-between bg-white overflow-visible">
              <View className="flex-1">
                <MessagList
                  ref={messagListRef}
                  messages={messages}
                  currentUser={user}
                />
              </View>
              <View className="pt-2 pb-4">
                <View className="flex-row justify-center items-center mx-2 gap-4 px-4">
                  <View
                    className={`flex-row flex-1 justify-between bg-neutral-200 rounded-full px-2 items-center ${
                      Platform.OS == "ios" ? "py-4" : "py-1"
                    } my-2 border-neutral-300`}
                  >
                    <TextInput
                      value={textRer}
                      onChangeText={(value) => settextRer(value)}
                      className="flex-1 mr-2"
                      placeholder="Message"
                      style={{ fontSize: hp(2) }}
                      onFocus={handelScrol0}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handelSendMessag}
                    className="p-4 mr-[1px] rounded-full bg-[#7035a5]"
                  >
                    <Ionicons color={"#e5e5e5"} name="send" size={hp(2)} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chatpage;

const styles = StyleSheet.create({});
