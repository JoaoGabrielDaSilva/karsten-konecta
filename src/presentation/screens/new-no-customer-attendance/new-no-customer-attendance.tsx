import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateStackParamList } from "../../routes";

import { Container, Content, CustomTextInput } from "./styles";
import { Typography } from "../../components/utils";
import { Button } from "../../components/buttons/button/button";
import { StackScreenProps } from "@react-navigation/stack";
import { makeNewNoCustomerAttendanceSchema } from "./schema";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "NewNoCustomerAttendance"
>;

type Props = NavigationProps;

export const NewNoCustomerAttendance = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(makeNewNoCustomerAttendanceSchema()),
  });

  const onSubmit = async ({ name }) =>
    navigation.navigate("Attendance", { name });

  return (
    <Container>
      <Content>
        <Typography variant="subtitle" semibold>
          Digite o nome do cliente para iniciar um atendimento
        </Typography>
        <CustomTextInput
          testID="name-input"
          control={control}
          name="name"
          placeholder="Nome"
        />
        <Button text="Iniciar Atendimento" onPress={handleSubmit(onSubmit)} />
      </Content>
    </Container>
  );
};
