import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React from "react";
import { RootPrivateStackParamList } from "../../../routes";
import { Container, Route, RouteIcon, RouteName } from "./styles";

type Route = {
  name: keyof RootPrivateStackParamList;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ROUTES: Route[] = [
  {
    name: "Catalog",
    label: "Catálogo",
    icon: "ios-list-outline",
  },
  {
    name: "Sales",
    label: "Vendas",
    icon: "ios-add-circle-outline",
  },
  {
    name: "CustomerSearch",
    label: "Consulta 360",
    icon: "people-outline",
  },
];

export const BottomTab = () => {
  const { getState, navigate } = useNavigation();
  const { routes, index } = getState();
  const activeRoute = routes[index]?.name;

  return (
    <Container align="center" justify="space-around">
      {ROUTES.map((route) => (
        <Route
          key={route.name}
          onPress={() => navigate(route.name)}
          active={activeRoute === route.name}
        >
          <RouteIcon name={route.icon} />
          <RouteName>{route.label}</RouteName>
        </Route>
      ))}
    </Container>
  );
};
