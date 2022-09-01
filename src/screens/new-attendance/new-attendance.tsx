import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useState } from "react";
import { get, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateDrawerParamList } from "../../routes";
import { cpfRule } from "../../utils/yup-schemas/cpf-rule";

import { Container, Content, CustomTextInput } from "./styles";
import { Typography } from "../../components";
import { Button } from "../../components/buttons/button/button";
import { Keyboard } from "react-native";
import { validateCpf } from "../../utils/validation/validate-cpf";

type NavigationProps = DrawerScreenProps<
  RootPrivateDrawerParamList,
  "NewAttendance"
>;

type Props = NavigationProps;

export const NewAttendance = ({ navigation }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        cpf: cpfRule,
      })
    ),
  });

  const [loading, setLoading] = useState(false);

  const getAttendance = () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset({ cpf: "" });
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
          onMaxLength={handleSubmit(getAttendance)}
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
