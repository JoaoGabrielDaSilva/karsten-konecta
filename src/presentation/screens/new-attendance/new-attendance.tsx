import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { RootPrivateStackParamList } from "../../routes";
import { makeCpfRule } from "../../utils/yup-schemas/cpf-rule";
import { FormControl, Box } from "native-base";

import { Button } from "../../components/buttons/button/button";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { StackScreenProps } from "@react-navigation/stack";
import { useCustomerStore } from "../../store/customer";
import { PersonType } from "../../../domain/models/customer";
import { makeCnpjRule } from "../../utils/yup-schemas/cnpj-rule";
import { RadioButtonGroup } from "../../components/form/radio-button/radio-button";
import { useUserStore } from "../../store/user";
import { TextInput } from "../../components/form/text-input/text-input";
import { Keyboard } from "react-native";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "NewAttendance"
>;

type Props = NavigationProps & {
  getCustomer: GetCustomer;
};

type FormValues = {
  cpfCnpj: string;
  personType: PersonType;
};

export const NewAttendance = ({ navigation, getCustomer }: Props) => {
  const [loading, setLoading] = useState(false);

  const [currentPersonType, setCurrentPersonType] = useState(
    PersonType.NATURAL
  );

  const { store } = useUserStore();
  const { setCustomer } = useCustomerStore();

  const { control, handleSubmit, clearErrors, reset } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        cpfCnpj: yup.string().when("personType", {
          is: PersonType.NATURAL,
          then: makeCpfRule(),
          otherwise: makeCnpjRule(),
        }),
      })
    ),
    defaultValues: {
      cpfCnpj: "",
      personType: currentPersonType,
    },
    mode: "onSubmit",
  });

  const fetchCustomer = async ({ cpfCnpj, personType }: FormValues) => {
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
        personType,
      });

      setLoading(false);
      navigation.navigate("Attendance");
    } catch (error) {
      setLoading(false);
      setCustomer({ cpfCnpj });
      console.log(error.response);

      navigation.navigate("Attendance", {
        screen: "NewNoCustomerAttendance",
      });
    }
  };

  const resetForm = (option: PersonType) => {
    clearErrors();
    reset({
      cpfCnpj: "",
    });
    setCurrentPersonType(option);
  };

  return (
    <Box bg="secondary.500" flex="1">
      <StackNavbar title="Novo Atendimento" />
      <Box bg="white" p="4">
        <FormControl>
          <RadioButtonGroup<FormValues, PersonType>
            name="personType"
            control={control}
            onChange={resetForm}
            options={[
              { label: "Pessoa Física", value: PersonType.NATURAL },
              { label: "Pessoa Jurídica", value: PersonType.LEGAL },
            ]}
          />
          <TextInput<FormValues>
            control={control}
            name="cpfCnpj"
            containerStyle={{
              mt: "2",
              mb: "4",
            }}
            mb="2"
            onMaxLength={() => handleSubmit(fetchCustomer)()}
            fetching={loading}
            mask={currentPersonType === PersonType.NATURAL ? "cpf" : "cnpj"}
            placeholder={
              currentPersonType === PersonType.NATURAL ? "CPF" : "CNPJ"
            }
            returnKeyType="done"
          />
        </FormControl>

        <Button
          onPress={() =>
            navigation.navigate("Attendance", {
              screen: "NewNoCustomerAttendance",
            })
          }
          disabled={loading}
        >
          Atendimento sem Cliente
        </Button>
      </Box>
    </Box>
  );
};
