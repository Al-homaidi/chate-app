import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Messagitem from "./Messagitem";

const MessagList = forwardRef(({ messages, currentUser }: any, ref) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    },
    scrollToBottom: () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    },
  }));

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
      onContentSizeChange={handleContentSizeChange}
    >
      {messages.map((message: any, index: any) => (
        <Messagitem message={message} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
});

export default MessagList;
