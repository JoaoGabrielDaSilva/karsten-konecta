import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootPrivateStackParamList } from "../../routes";
import { Container, MenuItem } from "./styles";

type NavigationProps = BottomTabScreenProps<RootPrivateStackParamList, "Sales">;

type Props = NavigationProps;

export const Sales = ({ navigation: { navigate } }: Props) => {
  return (
    <Container>
      <MenuItem
        label="Novo Atendimento"
        onPress={() => navigate("NewAttendance")}
        rightIconFamily="feather"
        rightIcon="chevron-right"
      />
      <MenuItem
        label="Atendimentos em Aberto"
        onPress={() => navigate("AttendanceList")}
        rightIconFamily="feather"
        rightIcon="chevron-right"
      />
      <MenuItem
        label="Pedidos"
        onPress={() => navigate("OrderList")}
        rightIconFamily="feather"
        rightIcon="chevron-right"
        borderless
      />
    </Container>
  );
};
