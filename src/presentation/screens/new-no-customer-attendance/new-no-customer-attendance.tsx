import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateStackParamList } from "../../routes";

import { Button } from "../../components/buttons/button/button";
import { StackScreenProps } from "@react-navigation/stack";
import { makeNewNoCustomerAttendanceSchema } from "./schema";
import { Box } from "native-base";
import { TextInput } from "../../components/form/text-input/text-input";
import { Typography } from "../../components/utils";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "NewNoCustomerAttendance"
>;

type Props = NavigationProps;

export const NewNoCustomerAttendance = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(makeNewNoCustomerAttendanceSchema()),
  });

  const onSubmit = async ({ name }) => navigation.navigate("Attendance");

  return (
    <Box flex="1" bg="secondary.500">
      <StackNavbar title="Atendimento sem Cliente" />
      <Box p="4" bg="white">
        <Typography semibold fontSize="sm">
          Digite o nome do cliente para iniciar um atendimento
        </Typography>
        <TextInput
          testID="name-input"
          control={control}
          name="name"
          placeholder="Nome"
          containerStyle={{
            my: "4",
          }}
          mb="2"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
        />
        <Button onPress={handleSubmit(onSubmit)}>Iniciar Atendimento</Button>
      </Box>
    </Box>
  );
};
