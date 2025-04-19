import { Stack } from "expo-router";
import { useAuth } from "@/context/authContext";
import { Redirect } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import Hedar from "@/components/Hedar";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/singin" />;
  }

  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            header: () => <Hedar />,
          }}
        />
        <Stack.Screen name="chatpage" />
      </Stack>
    </MenuProvider>
  );
}
