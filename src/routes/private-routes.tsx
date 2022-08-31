import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import { View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTheme } from "styled-components";
import { Drawer as DrawerComponent, Header } from "../components";
import { NewAttendance } from "../screens";

export type RootPrivateStackParamList = {
  Root: undefined;
};
export type RootPrivateDrawerParamList = {
  NewAttendance: undefined;
};

const Stack = createSharedElementStackNavigator<RootPrivateStackParamList>();
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
      {/* <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: false,
          presentation: "modal",
        }}
      /> */}
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        drawerPosition: "right",
      }}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen
        name="NewAttendance"
        component={NewAttendance}
        options={{
          title: "Novo Atendimento",

          header: (props) => <Header {...props} />,
        }}
      />
    </Drawer.Navigator>
  );
};
