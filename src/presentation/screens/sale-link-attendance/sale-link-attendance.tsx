import { StackScreenProps } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FlatList, View } from "react-native";
import { SelectOption } from "../../components/form/select-input/select-input";
import { Typography } from "../../components/utils";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import {
  Container,
  Footer,
  Form,
  StyledButton,
  StyledListProduct,
  StyledSelectInput,
  Total,
  TotalContainer,
  TotalLabel,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "SaleLinkAttendance"
>;

type Props = NavigationProps;

type FormValues = {
  installments: number;
};

const installmentsOptions: SelectOption[] = [
  {
    label: "1 parcela",
    value: 1,
  },
  {
    label: "2 parcelas",
    value: 2,
  },
  {
    label: "3 parcelas",
    value: 3,
  },
  {
    label: "4 parcelas",
    value: 4,
  },
  {
    label: "5 parcelas",
    value: 5,
  },
  {
    label: "6 parcelas",
    value: 6,
  },
  {
    label: "7 parcelas",
    value: 7,
  },
  {
    label: "8 parcelas",
    value: 8,
  },
  {
    label: "9 parcelas",
    value: 9,
  },
  {
    label: "10 parcelas",
    value: 10,
  },
];

const getInstallmentsOptions = (total: number): SelectOption[] => {
  const maxInstallments = Math.floor(total / 50);

  return installmentsOptions.map((item) =>
    item.value > maxInstallments ? { ...item, disabled: true } : item
  );
};

export const SaleLinkAttendance = ({}: Props) => {
  const { productList } = useAttendanceStore();

  const { control, handleSubmit } = useForm<FormValues>();

  const data = productList;

  const total = useMemo(
    () =>
      data.reduce(
        (total, product) => total + product.amount * product.price,
        0
      ),
    [data]
  );

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <StyledListProduct {...item} borderless={index === data.length - 1} />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Form>
            <StyledSelectInput
              name="installments"
              control={control}
              options={getInstallmentsOptions(total)}
              placeholder="Quantidade de parcelas"
              defaultValue={1}
            />
          </Form>
        }
      />
      <Footer>
        <TotalContainer>
          <TotalLabel bold variant="heading">
            Total
          </TotalLabel>
          <TotalLabel bold>R${total.toFixed(2)}</TotalLabel>
        </TotalContainer>
        <StyledButton text="Finalizar" onPress={() => {}} />
      </Footer>
    </Container>
  );
};
