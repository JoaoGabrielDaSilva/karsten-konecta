import React from "react";
import { View } from "react-native";
import { Button } from "../../../../components/buttons/button/button";
import { useAttendanceStore } from "../../../../store/attendance";
import { Container } from "./styles";

type Props = {
  loading: boolean;
  disabled: boolean;
  handleDeleteAttendance: () => void;
  handleFinishAttendance: () => void;
};

export const AttendanceFooter = ({
  loading,
  disabled,
  handleDeleteAttendance,
  handleFinishAttendance,
}: Props) => {
  const productList = useAttendanceStore((state) => state.productList);

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Button
          onPress={() =>
            productList.length === 0
              ? handleDeleteAttendance()
              : handleFinishAttendance()
          }
          text={
            productList.length > 0 || loading
              ? "Finalizar Atendimento"
              : "Excluir Atendimento"
          }
          disabled={disabled}
          loading={loading}
        />
      </View>
    </Container>
  );
};
