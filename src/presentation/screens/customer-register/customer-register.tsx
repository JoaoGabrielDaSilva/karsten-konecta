import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  CustomerModel,
  Gender,
  PersonType,
} from "../../../domain/models/customer";
import { CreateCustomer } from "../../../domain/usecases/customer/create-customer";
import { EditCustomer } from "../../../domain/usecases/customer/edit-customer";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { Address } from "../../components/address/address";
import { Button } from "../../components/buttons/button/button";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import {
  SelectInput,
  SelectInputRef,
} from "../../components/form/select-input/select-input";
import { Toast } from "../../components/toast/toast";
import { SectionTitle } from "../../components/utils/section-title/section-title";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { useUserStore } from "../../store/user";
import { customerRegisterSchema } from "./schema";
import {
  AddIcon,
  AddressContainer,
  Container,
  Content,
  CustomTextInput,
  Footer,
  Form,
  NoAddressFound,
  StyledAddress,
  StyledAddressLoader,
  StyledCheckbox,
  StyledRow,
  StyledSectionTitle,
} from "./styles";
import { LinkCustomerToAttendance } from "../../../domain/usecases/attendance/link-customer-to-attendance";
import { useRef } from "react";
import { TextInputRef } from "../../components/form/text-input/text-input";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "CustomerRegister"
>;

type Props = NavigationProps & {
  getCustomer: GetCustomer;
  createCustomer: CreateCustomer;
  editCustomer: EditCustomer;
  linkCustomer: LinkCustomerToAttendance;
};

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

type FormValues = CustomerModel;

export const CustomerRegister = ({
  navigation: { navigate },
  getCustomer,
  createCustomer,
  editCustomer,
  linkCustomer,
}: Props) => {
  const theme = useTheme();
  const { data: customer, clearCustomer, setCustomer } = useCustomerStore();
  const { clearAttendance, ...attendance } = useAttendanceStore();
  const { store } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<TextInputRef>();
  const cpfRef = useRef<TextInputRef>();
  const phoneRef = useRef<TextInputRef>();
  const genderRef = useRef<SelectInputRef>();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerRegisterSchema),
    shouldFocusError: true,
    defaultValues: customer,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const payload = {
        storeId: store.id,
        type: PersonType.NATURAL,
        customer: data,
      };

      !customer.id
        ? await createCustomer.execute({
            ...payload,
            customer: { ...payload.customer, birthDate: "10/07/2002" },
          })
        : await editCustomer.execute({
            ...payload,
          });

      const newCustomerData: CustomerModel = await getCustomer.get({
        cpfCnpj: data.cpfCnpj,
        storeId: store.id,
      });

      if (!customer.id) {
        await linkCustomer.execute({
          attendanceId: attendance.id,
          customerId: newCustomerData.id,
          storeId: store.id,
        });
      }

      if (!customer.id) {
        navigate("AddressRegister");
      }
      setCustomer({ ...newCustomerData, id: String(newCustomerData.id) });
      setIsSubmitting(false);
      Toast({
        type: "success",
        title: "Sucesso",
        message: `Cliente ${
          customer.id ? "editado" : "cadastrado"
        } com sucesso!`,
      });
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  const verifyCustomer = async () => {
    try {
      setLoading(true);
      const cpfCnpj = watch("cpfCnpj");
      const customer = await getCustomer.get({ cpfCnpj, storeId: store.id });

      if (customer.id && attendance.id) {
        await linkCustomer.execute({
          attendanceId: attendance.id,
          customerId: String(customer.id),
          storeId: store.id,
        });
        setCustomer({ ...customer, id: String(customer.id) });
        reset(customer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <StyledSectionTitle>Dados Pessoais</StyledSectionTitle>
        <Form>
          <CustomTextInput
            name="name"
            placeholder="Nome"
            control={control}
            editable={!loading && !isSubmitting}
            onSubmitEditing={() => emailRef?.current?.focus()}
            returnKeyType="next"
          />
          <CustomTextInput
            ref={emailRef}
            name="email"
            placeholder="E-mail"
            control={control}
            editable={!loading && !isSubmitting}
            returnKeyType="next"
            onSubmitEditing={() =>
              customer.id
                ? phoneRef?.current?.focus()
                : cpfRef?.current?.focus()
            }
          />
          <CustomTextInput
            ref={cpfRef}
            control={control}
            name="cpfCnpj"
            placeholder="CPF"
            mask="cpf"
            loading={loading}
            editable={!customer.id && !loading && !isSubmitting}
            onMaxLength={verifyCustomer}
            onSubmitEditing={() => phoneRef?.current?.focus()}
          />
          <CustomTextInput
            ref={phoneRef}
            control={control}
            name="phone"
            placeholder="Telefone"
            mask="phone"
            editable={!loading && !isSubmitting}
            onSubmitEditing={() => genderRef?.current?.focus()}
          />
          <SelectInput
            control={control}
            name="gender"
            placeholder="Gênero"
            options={genderOptions}
            editable={!loading && !isSubmitting}
            ref={genderRef}
          />
        </Form>

        {customer.id || loading ? (
          <StyledRow align="center" justify="space-between">
            <SectionTitle>Endereços</SectionTitle>
            <BorderlessButton
              onPress={() => navigate("AddressRegister")}
              enabled={!loading && !isSubmitting}
            >
              <AddIcon
                name="add"
                style={{ opacity: !loading && !isSubmitting ? 1 : 0.5 }}
              />
            </BorderlessButton>
          </StyledRow>
        ) : null}
        <AddressContainer>
          {loading && (
            <>
              <StyledAddressLoader />
              <StyledAddressLoader />
            </>
          )}
          {customer.id ? (
            customer?.addressList?.length > 0 ? (
              customer.addressList.map((address) => (
                <RectButton
                  key={address.id}
                  onPress={() =>
                    navigate("AddressRegister", {
                      address,
                    })
                  }
                  enabled={!isSubmitting}
                >
                  <StyledAddress disabled={isSubmitting} {...address} />
                </RectButton>
              ))
            ) : (
              <NoAddressFound>
                Você não possuí nenhum endereço cadastrado
              </NoAddressFound>
            )
          ) : null}
        </AddressContainer>

        <StyledSectionTitle>Opcionais</StyledSectionTitle>

        <Form>
          <StyledCheckbox
            name="optWhatsapp"
            control={control}
            label="Whatsapp"
            disabled={loading || isSubmitting}
          />
          <StyledCheckbox
            name="optEmail"
            control={control}
            label="E-mail"
            disabled={loading || isSubmitting}
          />
          <StyledCheckbox
            name="optPhoneCall"
            control={control}
            label="Ligações Telefonicas"
            disabled={loading || isSubmitting}
          />
          <Checkbox
            name="optSms"
            control={control}
            label="Mensagens"
            disabled={loading || isSubmitting}
          />
        </Form>
      </KeyboardAwareScrollView>
      <Footer>
        <Button
          text={customer.id ? "Editar" : "Cadastrar"}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={isSubmitting}
        />
      </Footer>
    </Container>
  );
};
