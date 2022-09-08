import React from "react";
import { Button } from "../../../../components/buttons/button/button";
import { Container } from "./styles";

type Props = {
  loading: boolean;
};

export const AttendanceFooter = ({ loading }: Props) => {
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
