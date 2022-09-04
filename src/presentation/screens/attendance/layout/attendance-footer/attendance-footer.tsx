import React from "react";
import { Button } from "../../../../components/buttons/button/button";
import { useAttendanceStore } from "../../../../store/attendance";
import { Container } from "./styles";

export const AttendanceFooter = () => {
  const { loading } = useAttendanceStore();

  return (
    <Container>
      <Button
        onPress={() => {}}
        text="Finalizar Atendimento"
        disabled={loading}
      />
    </Container>
  );
};
