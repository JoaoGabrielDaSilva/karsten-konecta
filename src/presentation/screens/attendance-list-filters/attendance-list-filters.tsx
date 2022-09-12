import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import { RootPrivateStackParamList } from "../../routes/private-routes";
import { useAttendanceListFiltersStore } from "../../store/attendance-list-filters";

import { Container, StyledButton, StyledTextInput } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceListFilters"
>;

type Props = NavigationProps;

type FormValues = {
  name: string;
  cpfCnpj: string;
  initialDate: string;
  endDate: string;
};

export const AttendanceListFilters = ({
  navigation: { goBack, setOptions },
}: Props) => {
  const { control, handleSubmit, watch, reset } = useForm<FormValues>();
  const { filters, setFilters, clearFilters } = useAttendanceListFiltersStore();

  const isCnpj = watch("cpfCnpj")?.length >= 15;

  const onSubmit = ({ name, cpfCnpj, initialDate, endDate }: FormValues) => {
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
      initialDate: initialDate
        ? {
            label: "Data Inicial",
            value: initialDate,
            apiValue: initialDate,
            key: "initialDate",
          }
        : null,
      endDate: endDate
        ? {
            label: "Data Final",
            value: endDate,
            apiValue: endDate,
            key: "endDate",
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
      initialDate: "",
      endDate: "",
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
          placeholder={isCnpj ? "CNPJ" : "CPF"}
          mask="cpfCnpj"
          control={control}
          defaultValue={filters?.cpfCnpj?.value}
        />
        <StyledTextInput
          name="initialDate"
          placeholder="Data Inicial"
          control={control}
          defaultValue={filters?.initialDate?.value}
        />
        <StyledTextInput
          name="endDate"
          placeholder="Data Final"
          control={control}
          defaultValue={filters?.endDate?.value}
        />
      </KeyboardAwareScrollView>
      <StyledButton text="Filtrar" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
};
