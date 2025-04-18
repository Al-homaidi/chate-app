import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatList from "@/components/ChatList";
import { useAuth } from "@/context/authContext";
import { getDocs, query, where } from "firebase/firestore";
import { usersRif } from "@/FirbaseConfig";

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user]);

  const getUsers = async () => {
    try {
      const q = query(usersRif, where("userId", "!=", user?.uid));
      const querySnapshot = await getDocs(q);

      let data: any[] = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Record<string, any>) });
      });

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7035a5" />
        </View>
      ) : users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-1xl">There are no other users yet</Text>
        </View>
      ) : (
        <ChatList users={users} />
      )}
    </SafeAreaView>
  );
};

export default Home;
