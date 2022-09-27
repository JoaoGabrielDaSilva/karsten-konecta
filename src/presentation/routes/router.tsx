import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { useUserStore } from "../store/user";
import { PrivateRoutes } from "./private-routes";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./public-routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export const Router = () => {
  const theme = useTheme();
  const { logged } = useUserStore();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.background.primary,
        paddingTop: logged ? Constants.statusBarHeight : 0,
      }}
    >
      <StatusBar style="dark" />
      <NavigationContainer>
        {logged ? <PrivateRoutes /> : <PublicRoutes />}
      </NavigationContainer>
      <Toast />
    </View>
  );
};
