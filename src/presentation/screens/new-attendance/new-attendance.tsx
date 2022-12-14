import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateStackParamList } from "../../routes";
import { makeCpfRule } from "../../utils/yup-schemas/cpf-rule";

import { Container, Content, CustomTextInput, StyledRow } from "./styles";
import { Typography } from "../../components/utils";
import { Button } from "../../components/buttons/button/button";
import { Keyboard, View } from "react-native";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { StackScreenProps } from "@react-navigation/stack";
import { useCustomerStore } from "../../store/customer";
import { RadioButton } from "../../components/buttons/radio-button/radio-button";
import { PersonType } from "../../../domain/models/customer";
import { makeCnpjRule } from "../../utils/yup-schemas/cnpj-rule";
import { FormRadioButton } from "../../components/form/radio-button/radio-button";
import { useUserStore } from "../../store/user";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "NewAttendance"
>;

type Props = NavigationProps & {
  getCustomer: GetCustomer;
};

type FormValues = {
  cpfCnpj: string;
};

export const NewAttendance = ({ navigation, getCustomer }: Props) => {
  const [loading, setLoading] = useState(false);

  const { store } = useUserStore();
  const { setCustomer } = useCustomerStore();

  const { control, handleSubmit, clearErrors, reset, watch, setValue } =
    useForm({
      resolver: yupResolver(
        yup.object().shape({
          cpfCnpj: yup.string().when("naturalPerson", {
            is: true,
            then: makeCpfRule(),
            otherwise: makeCnpjRule(),
          }),
        })
      ),
      defaultValues: {
        cpfCnpj: "",
        naturalPerson: true,
        legalPerson: false,
      },
    });

  const naturalPersonField = watch("naturalPerson");
  const legalPersonField = watch("legalPerson");

  const fetchCustomer = async ({ cpfCnpj }: FormValues) => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      const customerData = await getCustomer.get({
        cpfCnpj,
        storeId: store.id,
      });

      setCustomer({
        ...customerData,
        id: String(customerData.id),
      });

      setLoading(false);
      navigation.navigate("Attendance", {
        cpfCnpj,
      });
    } catch (error) {
      setLoading(false);
      setCustomer({ cpfCnpj });
      console.log(error.response);

      navigation.navigate("NewNoCustomerAttendance");
    }
  };

  useEffect(() => {
    clearErrors();
    setValue("cpfCnpj", "");
  }, [naturalPersonField, legalPersonField]);

  return (
    <Container>
      <Content>
        <Typography variant="subtitle" semibold>
          Digite um CPF para iniciar um atendimento
        </Typography>
        <StyledRow align="center" justify="space-between">
          <FormRadioButton
            variant="small"
            label="Pessoa F??sica"
            control={control}
            name="naturalPerson"
            onPress={() => setValue("legalPerson", false)}
            disabled={loading}
          />
          <FormRadioButton
            variant="small"
            label="Pessoa Jur??dica"
            control={control}
            name="legalPerson"
            onPress={() => setValue("naturalPerson", false)}
            disabled={loading}
          />
        </StyledRow>
        <CustomTextInput
          testID="cpfCnpj"
          control={control}
          name="cpfCnpj"
          placeholder={naturalPersonField ? "CPF" : "CNPJ"}
          mask={naturalPersonField ? "cpf" : "cnpj"}
          onMaxLength={() => handleSubmit(fetchCustomer)()}
          loading={loading}
        />
        <Button
          text="Atendimento sem Cliente"
          onPress={() => navigation.navigate("NewNoCustomerAttendance")}
          disabled={loading}
        />
      </Content>
    </Container>
  );
};
