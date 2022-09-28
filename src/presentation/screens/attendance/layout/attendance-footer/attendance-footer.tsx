import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../../../../components/buttons/button/button";
import { RootPrivateStackParamList } from "../../../../routes";
import { useAttendanceStore } from "../../../../store/attendance";
import { useUserStore } from "../../../../store/user";
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

  const theme = useTheme();
  const { store } = useUserStore();

  const { navigate } =
    useNavigation<StackNavigationProp<RootPrivateStackParamList>>();

  const handleFinishWithSaleLink = () => {
    navigate("SaleLinkAttendance");
  };

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
      {!store.isMultiBrand && productList.length > 0 && (
        <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
          <Button
            onPress={handleFinishWithSaleLink}
            text="Venda Link"
            disabled={disabled}
            loading={loading}
          />
        </View>
      )}
    </Container>
  );
};
