import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Row } from "../../../../components";
import { useAttendanceStore } from "../../../../store/attendance";
import {
  AttendanceName,
  Container,
  CustomerActionLabel,
  UserIcon,
} from "./styles";

export const AttendanceHeader = () => {
  const { name } = useAttendanceStore();
  const { navigate } = useNavigation();

  return (
    <Container align="center" justify="space-between">
      <Row align="center">
        <UserIcon name="user" />
        <AttendanceName bold>{name}</AttendanceName>
      </Row>
      <RectButton onPress={() => navigate("CustomerRegister")}>
        <CustomerActionLabel semibold>
          {name ? "Editar" : "Finalizar"}
        </CustomerActionLabel>
      </RectButton>
    </Container>
  );
};
