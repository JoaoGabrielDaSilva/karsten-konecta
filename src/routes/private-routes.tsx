import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";

import { View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTheme } from "styled-components";
import { Header, Drawer as DrawerComponent } from "../components";
import { EmailList } from "../screens";
import { Email } from "../screens/email/email";
import { Search } from "../screens/search/search";
import { Settings } from "../screens/settings/settings";

export type RootPrivateStackParamList = {
  Root: undefined;
  Settings: undefined;
  Email: undefined;
  Search: undefined;
};
export type RootPrivateDrawerParamList = {
  EmailList: undefined;
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
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{
          title: "E-mail",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "",
          headerShown: false,
          animationEnabled: false,
        }}
      />
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
          title: "Inbox",
        }}
      />
    </Drawer.Navigator>
  );
};
