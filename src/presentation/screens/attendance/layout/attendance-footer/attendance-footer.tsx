import React from "react";
import { View } from "react-native";
import { Button } from "../../../../components/buttons/button/button";
import { useAttendanceStore } from "../../../../store/attendance";
import { Container } from "./styles";

type Props = {
  loading: boolean;
  deleting: boolean;
  handleDeleteAttendance: () => void;
  handleVerifyAttendanceProducts: () => void;
};

export const AttendanceFooter = ({
  loading,
  deleting,
  handleDeleteAttendance,
  handleVerifyAttendanceProducts,
}: Props) => {
  const productList = useAttendanceStore((state) => state.productList);

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Button
          onPress={() =>
            productList.length === 0
              ? handleDeleteAttendance()
              : handleVerifyAttendanceProducts()
          }
          text={
            productList.length > 0 || loading
              ? "Finalizar Atendimento"
              : "Excluir Atendimento"
          }
          disabled={loading}
          loading={deleting}
        />
      </View>
    </Container>
  );
};
