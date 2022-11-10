import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import React, { RefObject, useEffect, useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { useTheme } from "styled-components/native";
import { CustomerAddressModel } from "../../../domain/models/address";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { GetAddressByCep } from "../../../domain/usecases/cep/get-address-by-cep";
import { CreateCustomerAddress } from "../../../domain/usecases/customer/create-customer-address";
import { EditCustomerAddress } from "../../../domain/usecases/customer/edit-customer-address";
import { GetCustomerAddressList } from "../../../domain/usecases/customer/get-customer-address-list";
import { Button } from "../../components/buttons/button/button";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import { SelectInputRef } from "../../components/form/select-input/select-input";
import { TextInputRef } from "../../components/form/text-input/text-input";
import { Toast } from "../../components/toast/toast";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { useUserStore } from "../../store/user";
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

type Props = NavigationProps & {
  getAddressList: GetCustomerAddressList;
  createAddress: CreateCustomerAddress;
  editAddress: EditCustomerAddress;
  getAddressByCep: GetAddressByCep;
  getAttendance: GetAttendance;
};

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

type FormValues = CustomerAddressModel;

export const AddressRegister = ({
  navigation: { goBack, setOptions },
  route,
  getAddressList,
  createAddress,
  editAddress,
  getAddressByCep,
  getAttendance,
}: Props) => {
  const address = route.params?.address;

  const { data: customer, setCustomer } = useCustomerStore();
  const { setAttendance, ...attendance } = useAttendanceStore();
  const { store } = useUserStore();

  const hasNoAddress = customer.addressList.length === 0;
  const hasOnlyOneAddress = customer.addressList.length === 1;

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cepRef = useRef<TextInputRef>();
  const streetRef = useRef<TextInputRef>();
  const numberRef = useRef<TextInputRef>();
  const districtRef = useRef<TextInputRef>();
  const complementRef = useRef<TextInputRef>();
  const cityRef = useRef<TextInputRef>();
  const stateRef = useRef<SelectInputRef>();

  const { control, handleSubmit, reset, getValues } = useForm<FormValues>({
    resolver: yupResolver(addressRegisterSchema),
    shouldFocusError: true,
    defaultValues: {
      ...address,
      isMain: address ? address?.isMain : hasNoAddress,
    },
  });

  const theme = useTheme();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      !address
        ? await createAddress.execute({
            customerId: customer.id,
            address: { ...data },
          })
        : await editAddress.execute({
            customerId: customer.id,
            address: { ...data, id: address.id },
          });

      const { addressList } = await getAddressList.execute({ id: customer.id });

      setCustomer({ addressList });
      setIsSubmitting(false);
      Toast({
        type: "success",
        title: "Sucesso!",
        message: `Endereço ${!address ? "cadastrado" : "editado"} com sucesso!`,
      });
      if (attendance?.id) {
        const attendanceDetails = await getAttendance.get({
          id: String(attendance.id),
          storeId: store.id,
        });

        setAttendance({
          ...attendanceDetails,
          id: String(attendanceDetails.id),
        });
      }
      goBack();
    } catch (error) {
      Toast({
        type: "error",
        title: "Erro!",
        message: `Erro ao ${!address ? "cadastrar" : "editar"} o endereço!`,
      });
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const loadInfoByCep = async (cep: string) => {
    try {
      setLoading(true);

      const currentFieldValues = getValues();
      const { address } = await getAddressByCep.execute({ cep });

      reset({
        street: currentFieldValues?.street || address?.street || "",
        cep: currentFieldValues?.cep,
        district: currentFieldValues?.district || address?.district || "",
        city: currentFieldValues?.city || address?.city || "",
        state: currentFieldValues?.state || address?.state || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOptions({
      title: !address ? "Cadastrar Endereço" : "Editar Endereço",
    });
  }, []);

  const handleFocusNextInput = (
    nextInputRef: RefObject<TextInputRef | SelectInputRef>
  ) => {
    nextInputRef?.current?.focus();
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <Form>
          <CustomTextInput
            name="name"
            placeholder="Nome (Ex: Casa, Trabalho)"
            control={control}
            onSubmitEditing={() => handleFocusNextInput(cepRef)}
          />
          <CustomTextInput
            ref={cepRef}
            control={control}
            name="cep"
            placeholder="CEP"
            mask="cep"
            onMaxLength={loadInfoByCep}
            loading={loading}
            onSubmitEditing={() => handleFocusNextInput(streetRef)}
          />

          <CustomTextInput
            ref={streetRef}
            control={control}
            name="street"
            placeholder="Logradouro"
            editable={!loading}
            onSubmitEditing={() => handleFocusNextInput(numberRef)}
          />
          <CustomTextInput
            ref={numberRef}
            control={control}
            name="number"
            placeholder="Número"
            editable={!loading}
            onSubmitEditing={() => handleFocusNextInput(districtRef)}
          />
          <CustomTextInput
            ref={districtRef}
            control={control}
            name="district"
            placeholder="Bairro"
            editable={!loading}
            onSubmitEditing={() => handleFocusNextInput(complementRef)}
          />
          <CustomTextInput
            ref={complementRef}
            control={control}
            name="complement"
            placeholder="Complemento"
            onSubmitEditing={() => handleFocusNextInput(cityRef)}
          />
          <CustomTextInput
            ref={cityRef}
            control={control}
            name="city"
            placeholder="Cidade"
            editable={!loading}
            onSubmitEditing={() => handleFocusNextInput(stateRef)}
          />
          <StyledSelectInput
            ref={stateRef}
            control={control}
            name="state"
            placeholder="Estado"
            options={stateOptions}
            editable={!loading}
          />
          <CustomTextInput
            control={control}
            name="reference"
            placeholder="Referência"
            onSubmitEditing={Keyboard.dismiss}
          />
        </Form>

        <Form>
          <Checkbox
            name="isMain"
            control={control}
            label="Definir este endereço como Principal"
            disabled={hasNoAddress || hasOnlyOneAddress}
          />
        </Form>
      </KeyboardAwareScrollView>
      <Footer>
        <Button
          text={!address ? "Cadastrar" : "Editar"}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={isSubmitting}
        />
      </Footer>
    </Container>
  );
};
