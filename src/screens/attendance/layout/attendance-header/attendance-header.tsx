import React from "react";
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

  return (
    <Container align="center" justify="space-between">
      <Row align="center">
        <UserIcon name="user" />
        <AttendanceName bold>{name}</AttendanceName>
      </Row>
      <CustomerActionLabel semibold>
        {name ? "Editar" : "Finalizar"}
      </CustomerActionLabel>
    </Container>
  );
};
