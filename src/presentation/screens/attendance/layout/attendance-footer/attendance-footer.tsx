import React from "react";
import { View } from "react-native";
import { Button } from "../../../../components/buttons/button/button";
import { useAttendanceStore } from "../../../../store/attendance";
import { Container } from "./styles";

type Props = {
  loading: boolean;
};

export const AttendanceFooter = ({ loading }: Props) => {
  const productList = useAttendanceStore((state) => state.productList);

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => {}}
          text={
            productList.length > 0 || loading
              ? "Finalizar Atendimento"
              : "Excluir Atendimento"
          }
          disabled={loading}
        />
      </View>
    </Container>
  );
};
