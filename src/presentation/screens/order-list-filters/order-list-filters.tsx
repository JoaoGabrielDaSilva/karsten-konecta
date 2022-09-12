import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import { RootPrivateStackParamList } from "../../routes/private-routes";
import { useAttendanceListFiltersStore } from "../../store/attendance-list-filters";
import { useOrderListFiltersStore } from "../../store/order-list-filters";

import {
  Container,
  StyledButton,
  StyledSelectInput,
  StyledTextInput,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "OrderListFilters"
>;

type Props = NavigationProps;

type FormValues = {
  name: string;
  cpfCnpj: string;
  orderCode: string;
  createdAt: string;
  status: string;
};

const STATUS_OPTIONS = [
  {
    label: "Registrado",
    value: "R",
  },
  {
    label: "Aprovado",
    value: "APROVADO",
  },
  {
    label: "Em Transporte",
    value: "TRANSPORTE",
  },
  {
    label: "Entregue",
    value: "ENTREGUE",
  },
  {
    label: "Cancelado",
    value: "CANCELADO",
  },
];

export const OrderListFilters = ({
  navigation: { goBack, setOptions },
}: Props) => {
  const { control, handleSubmit, watch, reset } = useForm<FormValues>();
  const { filters, setFilters, clearFilters } = useOrderListFiltersStore();

  const isCnpj = watch("cpfCnpj")?.length >= 15;

  const onSubmit = ({
    name,
    cpfCnpj,
    orderCode,
    status,
    createdAt,
  }: FormValues) => {
    setFilters({
      ...filters,
      name: name
        ? { label: "Nome", value: name, apiValue: name, key: "name" }
        : null,
      cpfCnpj: cpfCnpj
        ? {
            label: "CPF/CNPJ",
            value: cpfCnpj,
            apiValue: cpfCnpj,
            key: "cpfCnpj",
          }
        : null,
      orderCode: orderCode
        ? {
            label: "Código do Pedido",
            value: orderCode,
            apiValue: orderCode,
            key: "orderCode",
          }
        : null,
      createdAt: createdAt
        ? {
            label: "Data de Criação",
            value: createdAt,
            apiValue: createdAt,
            key: "createdAt",
          }
        : null,
      status: status
        ? {
            label: "Status",
            value: status,
            apiValue: status,
            key: "status",
          }
        : null,
    });

    goBack();
  };

  const handleClearFilters = () => {
    clearFilters();
    reset({
      name: "",
      cpfCnpj: "",
      createdAt: "",
      orderCode: "",
      status: "",
    });
    goBack();
  };

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackNavbar
          rightIcon="filter-off"
          onRightIconPress={handleClearFilters}
          {...props}
        />
      ),
    });
  }, []);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <StyledTextInput
          name="name"
          placeholder="Nome do Atendimento"
          control={control}
          defaultValue={filters?.name?.value}
        />
        <StyledTextInput
          name="cpfCnpj"
          placeholder="CPF/CNPJ"
          mask="cpfCnpj"
          control={control}
          defaultValue={filters?.cpfCnpj?.value}
        />
        <StyledTextInput
          name="orderCode"
          placeholder="Código do Pedido"
          control={control}
          defaultValue={filters?.orderCode?.value}
        />
        <StyledSelectInput
          name="status"
          placeholder="Status"
          options={STATUS_OPTIONS}
          control={control}
          defaultValue={filters?.status?.value}
        />
      </KeyboardAwareScrollView>
      <StyledButton text="Filtrar" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
};
