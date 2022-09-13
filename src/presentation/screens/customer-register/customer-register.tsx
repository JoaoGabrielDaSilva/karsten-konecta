import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Gender } from "../../../domain/models/customer";
import { Address } from "../../components/address/address";
import { Button } from "../../components/buttons/button/button";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import { SelectInput } from "../../components/form/select-input/select-input";
import { SectionTitle } from "../../components/utils/section-title/section-title";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { customerRegisterSchema } from "./schema";
import {
  AddIcon,
  Container,
  Content,
  CustomTextInput,
  Footer,
  Form,
  StyledCheckbox,
  StyledRow,
  StyledSectionTitle,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "CustomerRegister"
>;

type Props = NavigationProps;

const genderOptions = [
  {
    label: "Não Informado",
    value: Gender.UNINFORMED,
  },
  {
    label: "Masculino",
    value: Gender.MALE,
  },
  {
    label: "Feminino",
    value: Gender.FEMALE,
  },
];

export const CustomerRegister = ({ navigation: { navigate } }: Props) => {
  const loading = false;

  const { data: customer, clearCustomer } = useCustomerStore();
  const { clearAttendance, ...attendance } = useAttendanceStore();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(customerRegisterSchema),
    shouldFocusError: true,
    defaultValues: customer,
  });
  const theme = useTheme();

  console.log(customer);

  const onSubmit = () => {};

  useEffect(() => {
    return () => {
      if (!attendance?.id) {
        clearAttendance();
        clearCustomer();
      }
    };
  }, []);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <StyledSectionTitle>Dados Pessoais</StyledSectionTitle>
        <Form>
          <CustomTextInput name="name" placeholder="Nome" control={control} />
          <CustomTextInput
            name="email"
            placeholder="E-mail"
            control={control}
          />
          <CustomTextInput
            control={control}
            name="cpfCnpj"
            placeholder="CPF"
            mask="cpf"
            loading={loading}
            editable={!customer.id}
          />
          <CustomTextInput
            control={control}
            name="phone"
            placeholder="Telefone"
            mask="phone"
          />
          <SelectInput
            control={control}
            name="gender"
            placeholder="Gênero"
            options={genderOptions}
          />
        </Form>
        <StyledRow align="center" justify="space-between">
          <SectionTitle>Endereços</SectionTitle>
          <BorderlessButton onPress={() => navigate("AddressRegister")}>
            <AddIcon name="add" />
          </BorderlessButton>
        </StyledRow>
        <Content>
          {customer?.addressList?.map((address) => (
            <RectButton
              key={address.id}
              onPress={() =>
                navigate("AddressRegister", {
                  address,
                })
              }
            >
              <Address {...address} />
            </RectButton>
          ))}
        </Content>
        <StyledSectionTitle>Opcionais</StyledSectionTitle>

        <Form>
          <StyledCheckbox
            name="optWhatsapp"
            control={control}
            label="Whatsapp"
          />
          <StyledCheckbox name="optEmail" control={control} label="E-mail" />
          <StyledCheckbox
            name="optPhoneCall"
            control={control}
            label="Ligações Telefonicas"
          />
          <Checkbox name="optSms" control={control} label="Mensagens" />
        </Form>
      </ScrollView>
      <Footer>
        <Button
          text={customer.id ? "Editar" : "Cadastrar"}
          onPress={handleSubmit(onSubmit)}
        />
      </Footer>
    </Container>
  );
};
