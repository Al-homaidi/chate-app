import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
import { blurhash, getRoomId } from "@/utils/blurhash";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/FirbaseConfig";

const ChatItem = ({ item, index, noBorder, router }: any) => {
  const [lastmeesage, setlastmeesage] = useState<
    DocumentData | null | undefined
  >(undefined);

  function openChatpage() {
    routers.push({ pathname: "/(app)/chatpage", params: item });
  }
  const { user } = useAuth();
  const routers = useRouter();

  useEffect(() => {
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createsAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let AllMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setlastmeesage(
        AllMessages[AllMessages.length - 1]
          ? AllMessages[AllMessages.length - 1]
          : null
      );
    });

    return unsub;
  }, []);

  const rendertime = () => {
    if (lastmeesage) {
      let second = lastmeesage?.createsAt?.seconds;
      let date = new Date(second * 1000);

      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();

      let laststate = `${year}/${month}/${day}`;
      return laststate;
    }
    return null;
  };

  const renderlastmessage = () => {
    if (typeof lastmeesage === "undefined") return "Loading...";

    if (lastmeesage) {
      let messageText =
        item?.userId == lastmeesage?.userId
          ? "you: " + lastmeesage?.text
          : lastmeesage?.text;

      if (messageText.length > 20) {
        return messageText.slice(0, 20) + "...";
      }

      return messageText;
    } else {
      return "Say Hi";
    }
  };

  return (
    <TouchableOpacity
      onPress={openChatpage}
      className={`flex-row justify-between mx-4 items-center gap-4 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-neutral-200"
      }`}
    >
      <Image
        source={item?.profileimg}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
        style={{
          height: hp(6),
          width: hp(6),
          aspectRatio: 1,
          borderRadius: 100,
        }}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.5) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.3) }}
            className="font-medium text-neutral-500"
          >
            {rendertime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.2) }}
          className="font-medium text-neutral-500"
        >
          {renderlastmessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
