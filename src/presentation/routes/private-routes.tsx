import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTheme } from "styled-components";
import { Drawer as DrawerComponent } from "../components";
import { StackNavbar } from "../components/navigation/stack-navbar/stack-navbar";
import { Address } from "../models/Address";
import { NewAttendance } from "../screens";
import { AddressRegister } from "../screens/address-register/address-register";
import { AttendanceList } from "../screens/attendance-list/attendance-list";
import { Attendance } from "../screens/attendance/attendance";
import { CustomerRegister } from "../screens/customer-register/customer-register";
import { OrderList } from "../screens/order-list/order-list";
import { ProductDetails } from "../screens/product-details/product-details";
import { ProductList } from "../screens/product-list/product-list";
import { Sales } from "../screens/sales/sales";
import { StoreSelect } from "../screens/store-select/store-select";

export type RootPrivateStackParamList = {
  Sales: undefined;
  NewAttendance: undefined;
  Attendance: undefined;
  ProductList: undefined;
  ProductDetails: undefined;
  CustomerRegister: undefined;
  AddressRegister: {
    address: Address;
  };
  StoreSelect: undefined;
  AttendanceList: undefined;
  OrderList: undefined;
};

export type RootPrivateDrawerParamList = {
  Root: undefined;
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
        <DrawerNavigator />
      </NavigationContainer>
    </View>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Sales">
      <Stack.Screen
        name="NewAttendance"
        component={NewAttendance}
        options={{
          title: "Novo Atendimento",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: "Carrinho",

          header: (props) => (
            <StackNavbar
              headerLeftIcon="close"
              onLeftIconPress={props.navigation.goBack}
              rightIcon="search"
              onRightIconPress={() => props.navigation.navigate("ProductList")}
              {...props}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: "Detalhes do Produto",

          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="CustomerRegister"
        component={CustomerRegister}
        options={{
          title: "Consumidor",

          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="AddressRegister"
        component={AddressRegister}
        options={{
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="StoreSelect"
        component={StoreSelect}
        options={{
          title: "Seleção de Loja",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="Sales"
        component={Sales}
        options={{
          title: "Vendas",
          header: (props) => <StackNavbar drawer {...props} />,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="AttendanceList"
        component={AttendanceList}
        options={{
          title: "Atendimentos em Aberto",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          title: "Pedidos",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        drawerPosition: "right",
        drawerStyle: {
          width: "80%",
        },
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen name="Root" component={StackNavigator} />
    </Drawer.Navigator>
  );
};
