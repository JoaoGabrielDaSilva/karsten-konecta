import { createDrawerNavigator } from "@react-navigation/drawer";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { makeAttendance } from "../../main/factories/pages/attendance-factory";
import { makeNewAttendance } from "../../main/factories/pages/new-attendance.factory";
import { makeNewNoCustomerAttendance } from "../../main/factories/pages/new-no-customer-attendance-factory";
import { makeProductDetails } from "../../main/factories/pages/product-details-factory";
import { makeProductList } from "../../main/factories/pages/product-list-factory";
import { Drawer as DrawerComponent } from "../components";
import { StackNavbar } from "../components/navigation/stack-navbar/stack-navbar";
import { Address } from "../models/Address";
import { AddressRegister } from "../screens/address-register/address-register";
import { AddressSelect } from "../screens/address-select/address-select";
import { AttendanceList } from "../screens/attendance-list/attendance-list";
import { CustomerRegister } from "../screens/customer-register/customer-register";
import { OrderList } from "../screens/order-list/order-list";
import { ProductDetails } from "../screens/product-details/product-details";
import { ProductList } from "../screens/product-list/product-list";
import { Sales } from "../screens/sales/sales";
import { StoreSelect } from "../screens/store-select/store-select";

export type RootPrivateStackParamList = {
  Login: undefined;
  Sales: undefined;
  NewAttendance: undefined;
  NewNoCustomerAttendance: undefined;
  Attendance: {
    name?: string;
  };
  AddressSelect: undefined;
  ProductList: undefined;
  ProductDetails: {
    code: string;
    ean: string;
  };
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
  return <DrawerNavigator />;
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewAttendance"
        component={makeNewAttendance}
        options={{
          title: "Novo Atendimento",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="NewNoCustomerAttendance"
        component={makeNewNoCustomerAttendance}
        options={{
          title: "Novo Atendimento sem Cliente",
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="Attendance"
        component={makeAttendance}
        options={{
          title: "Carrinho",

          header: (props) => (
            <StackNavbar
              headerLeftIcon="close"
              onLeftIconPress={() => props.navigation.navigate("Sales")}
              rightIcon="search"
              onRightIconPress={() => props.navigation.navigate("ProductList")}
              {...props}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={makeProductDetails}
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
        name="AddressSelect"
        component={AddressSelect}
        options={{
          title: "Selecionar Endereço",
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
        component={makeProductList}
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
