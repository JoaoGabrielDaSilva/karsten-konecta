import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";

import { View } from "react-native";
import { useTheme } from "styled-components";
import { Header, Drawer as DrawerComponent } from "../components";
import { EmailList } from "../screens";

export type RootPrivateStackParamList = {
  Root: undefined;
};
export type RootPrivateDrawerParamList = {
  EmailList: undefined;
};

const Stack = createStackNavigator<RootPrivateStackParamList>();
const Drawer = createDrawerNavigator<RootPrivateDrawerParamList>();

export const PrivateRoutes = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.background.primary,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Root" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        drawerType: "front",
      }}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen
        name="EmailList"
        component={EmailList}
        options={{
          title: "E-mails",
        }}
      />
    </Drawer.Navigator>
  );
};
