import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import { Gender } from "../../constants/enums/Gender";
import { Address } from "../../models/Address";

import { RootPrivateStackParamList } from "../../routes";
import { addressRegisterSchema } from "./schema";
import {
  Container,
  CustomTextInput,
  Footer,
  Form,
  StyledSelectInput,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AddressRegister"
>;

type Props = NavigationProps;

const stateOptions = [
  {
    label: "Acre (AC)",
    value: "AC",
  },
  {
    label: "Alagoas (AL)",
    value: "AL",
  },
  {
    label: "Amapá (AP)",
    value: "AP",
  },
  {
    label: "Amazonas (AM)",
    value: "AM",
  },
  {
    label: "Bahia (BA)",
    value: "BA",
  },
  {
    label: "Ceará (CE)",
    value: "CE",
  },
  {
    label: "Distrito Federal (DF)",
    value: "DF",
  },
  {
    label: "Espirito Santo (ES)",
    value: "ES",
  },
  {
    label: "Goiás (GO)",
    value: "GO",
  },
  {
    label: "Maranhão (MA)",
    value: "MA",
  },
  {
    label: "Mato Grosso (MT)",
    value: "MT",
  },
  {
    label: "Mato Grosso do Sul (MS)",
    value: "MS",
  },
  {
    label: "Minas Gerais (MG)",
    value: "MG",
  },
  {
    label: "Pará (PA)",
    value: "PA",
  },
  {
    label: "Paraíba (PB)",
    value: "PB",
  },
  {
    label: "Paraná (PR)",
    value: "PR",
  },
  {
    label: "Pernambuco (PE)",
    value: "PE",
  },
  {
    label: "Piauí (PI)",
    value: "PI",
  },
  {
    label: "Rio de Janeiro (RJ)",
    value: "RJ",
  },
  {
    label: "Rio Grande do Norte (RN)",
    value: "RN",
  },
  {
    label: "Rio Grande do Sul (RS)",
    value: "RS",
  },
  {
    label: "Rondônia (RO)",
    value: "RO",
  },
  {
    label: "Roraima (RR)",
    value: "RR",
  },
  {
    label: "Santa Catarina (SC)",
    value: "SC",
  },
  {
    label: "São Paulo (SP)",
    value: "SP",
  },
  {
    label: "Sergipe (SE)",
    value: "SE",
  },
  {
    label: "Tocantins (TO)",
    value: "TO",
  },
];

const addressList = [];

type FormValues = Address;

export const AddressRegister = ({ navigation, route }: Props) => {
  const address = route.params?.address;

  const loading = false;

  const hasNoAddress = addressList.length === 0;

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(addressRegisterSchema),
    shouldFocusError: true,
    defaultValues: {
      ...address,
      isMain: address ? address?.isMain : !hasNoAddress,
    },
  });
  const theme = useTheme();

  const onSubmit = () => {};

  useEffect(() => {
    navigation.setOptions({
      title: !address ? "Cadastrar Endereço" : "Editar Endereço",
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <Container>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: theme.spacing.xxl,
          }}
        >
          <Form>
            <CustomTextInput
              name="name"
              placeholder="Nome (Ex: Casa, Trabalho)"
              control={control}
            />
            <CustomTextInput
              control={control}
              name="cep"
              placeholder="CEP"
              mask="cep"
              loading={loading}
            />
            <CustomTextInput
              control={control}
              name="street"
              placeholder="Logradouro"
            />
            <CustomTextInput
              control={control}
              name="number"
              placeholder="Número"
            />
            <CustomTextInput
              control={control}
              name="district"
              placeholder="Bairro"
            />
            <CustomTextInput
              control={control}
              name="complement"
              placeholder="Complemento"
            />
            <CustomTextInput
              control={control}
              name="city"
              placeholder="Cidade"
            />
            <StyledSelectInput
              control={control}
              name="state"
              placeholder="Estado"
              options={stateOptions}
            />
            <CustomTextInput
              control={control}
              name="reference"
              placeholder="Referência"
            />
          </Form>

          <Form>
            <Checkbox
              name="isMain"
              control={control}
              label="Definir este endereço como Principal"
              disabled={hasNoAddress && !address}
            />
          </Form>
        </ScrollView>
        <Footer>
          <Button
            text={!address ? "Cadastrar" : "Concluir"}
            onPress={handleSubmit(onSubmit)}
          />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};
