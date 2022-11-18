import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { BottomTab } from "../../components/navigation/bottom-tab/bottom-tab";
import { ToolTip } from "../../components/tooltip/Tooltip";
import { RootPrivateStackParamList } from "../../routes";
import { Container, ItemContainer, MenuItem } from "./styles";
import { Box, useColorMode } from "native-base";
import { Pressable, Text, TouchableOpacity } from "react-native";

type NavigationProps = StackScreenProps<RootPrivateStackParamList, "Sales">;

type Props = NavigationProps;

export const Sales = ({ navigation: { navigate } }: Props) => {
  const { toggleColorMode } = useColorMode();
  return (
    <Container>
      <ItemContainer>
        <MenuItem
          label="Novo Atendimento"
          onPress={() =>
            navigate("Attendance", {
              screen: "NewAttendance",
            })
          }
          rightIconFamily="feather"
          rightIcon="chevron-right"
          testID="new-attendance-menu"
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
      </ItemContainer>
      <TouchableOpacity onPress={() => toggleColorMode()}>
        <Text>Toggle theme</Text>
      </TouchableOpacity>
      <BottomTab />
    </Container>
  );
};
