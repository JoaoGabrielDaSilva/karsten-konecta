import { createDrawerNavigator } from "@react-navigation/drawer";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTheme } from "styled-components/native";
import { makeAddressSelect } from "../../main/factories/pages/address-select-factory";
import { makeAddressRegister } from "../../main/factories/pages/address-register-factory";
import { makeAttendance } from "../../main/factories/pages/attendance-factory";
import { makeAttendanceList } from "../../main/factories/pages/attendance-list-factory";
import { makeAttendanceSelect } from "../../main/factories/pages/attendance-select-factory";
import { makeCustomerRegister } from "../../main/factories/pages/customer-register-factory";
import { makeNewAttendance } from "../../main/factories/pages/new-attendance.factory";
import { makeNewNoCustomerAttendance } from "../../main/factories/pages/new-no-customer-attendance-factory";
import { makeOrderList } from "../../main/factories/pages/order-list-factory";
import { makeProductDetails } from "../../main/factories/pages/product-details-factory";
import { makeProductList } from "../../main/factories/pages/product-list-factory";
import { makeStoreSelect } from "../../main/factories/pages/store-select-factory";
import { Drawer as DrawerComponent } from "../components";
import { AttendanceSelectCard } from "../components/cards/attendance-select-card/attendance-select-card";
import { StackNavbar } from "../components/navigation/stack-navbar/stack-navbar";
import { Address } from "../models/Address";
import { AddressRegister } from "../screens/address-register/address-register";
import { AttendanceListFilters } from "../screens/attendance-list-filters/attendance-list-filters";
import { Catalog } from "../screens/catalog/catalog";
import { CustomerRegister } from "../screens/customer-register/customer-register";
import { OrderListFilters } from "../screens/order-list-filters/order-list-filters";
import { Sales } from "../screens/sales/sales";
import { StoreSelect } from "../screens/store-select/store-select";
import { DeliveryMode } from "../store/attendance";
import { makeCatalog } from "../../main/factories/pages/catalog-factory";

export type RootPrivateStackParamList = {
  Login: undefined;
  Sales: undefined;
  Catalog: undefined;
  NewAttendance: undefined;
  NewNoCustomerAttendance: undefined;
  Attendance: {
    id: string;
    name?: string;
    cpfCnpj?: string;
  };
  AddressSelect: {
    deliveryMode: DeliveryMode;
  };
  AttendanceSelect: {
    product: {
      code: string;
      amount: string;
    };
  };
  ProductList: {
    defaultFocus?: boolean;
  };
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
  AttendanceListFilters: undefined;
  OrderList: undefined;
  OrderListFilters: undefined;
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
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Sales">
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
              rightIcon="text-search"
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
        name="AttendanceSelect"
        component={makeAttendanceSelect}
        options={{
          title: "Selecionar Atendimento",
          header: (props) => (
            <StackNavbar
              {...props}
              rightIcon="filter-variant"
              onRightIconPress={() =>
                props.navigation.navigate("AttendanceListFilters")
              }
            />
          ),
          presentation: "modal",
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="CustomerRegister"
        component={makeCustomerRegister}
        options={{
          title: "Consumidor",

          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="AddressRegister"
        component={makeAddressRegister}
        options={{
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="AddressSelect"
        component={makeAddressSelect}
        options={{
          header: (props) => <StackNavbar {...props} />,
        }}
      />
      <Stack.Screen
        name="StoreSelect"
        component={makeStoreSelect}
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
          header: (props) => (
            <StackNavbar drawer {...props} backArrow={false} />
          ),
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Catalog"
        component={makeCatalog}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={makeProductList}
        options={{
          animationEnabled: false,
        }}
        initialParams={{
          defaultFocus: false,
        }}
      />

      <Stack.Screen
        name="AttendanceList"
        component={makeAttendanceList}
        options={{
          title: "Atendimentos em Aberto",

          header: (props) => (
            <StackNavbar
              rightIcon="filter-variant"
              onRightIconPress={() =>
                props.navigation.navigate("AttendanceListFilters")
              }
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AttendanceListFilters"
        component={AttendanceListFilters}
        options={{
          title: "Filtros",
          header: (props) => <StackNavbar {...props} />,
          presentation: "modal",
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="OrderList"
        component={makeOrderList}
        options={{
          title: "Pedidos",
          header: (props) => (
            <StackNavbar
              rightIcon="filter-variant"
              onRightIconPress={() =>
                props.navigation.navigate("OrderListFilters")
              }
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="OrderListFilters"
        component={OrderListFilters}
        options={{
          title: "Filtros",
          header: (props) => <StackNavbar {...props} />,
          presentation: "modal",
          cardOverlayEnabled: false,
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
