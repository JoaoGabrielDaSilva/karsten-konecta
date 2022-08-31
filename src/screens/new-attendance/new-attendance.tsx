import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateDrawerParamList } from "../../routes";
import { cpfSchema } from "../../utils/yup-schemas/cpf-rule";

import { Container, Content, CustomTextInput } from "./styles";
import { Typography } from "../../components";
import { Button } from "../../components/buttons/button/button";
import { Keyboard } from "react-native";

type NavigationProps = DrawerScreenProps<
  RootPrivateDrawerParamList,
  "NewAttendance"
>;

type Props = NavigationProps;

export const NewAttendance = ({ navigation }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(cpfSchema),
  });

  const [loading, setLoading] = useState(false);

  const getAttendance = () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      navigation.navigate("Attendance");
    }, 1500);
  };

  return (
    <Container>
      <Content>
        <Typography variant="subtitle" semibold>
          Digite um CPF para iniciar um atendimento
        </Typography>
        <CustomTextInput
          control={control}
          name="cpf"
          placeholder="CPF"
          mask="cpf"
          onMaxLength={() => handleSubmit(getAttendance)()}
          loading={loading}
          showError
        />
        <Button
          text="Atendimento sem Cliente"
          onPress={() => {}}
          disabled={loading}
        />
      </Content>
    </Container>
  );
};
