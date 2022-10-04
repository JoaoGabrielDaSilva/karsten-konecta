import { StackScreenProps } from "@react-navigation/stack";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, View } from "react-native";
import { FinishAttendance } from "../../../domain/usecases/attendance/finish-attendance";
import { GetOrderDetails } from "../../../domain/usecases/order/get-order-details";
import { CreateSaleLink } from "../../../domain/usecases/sale-link/create-sale-link";
import { GetSaleLinkConfiguration } from "../../../domain/usecases/sale-link/get-sale-link-configuration";
import { SelectOption } from "../../components/form/select-input/select-input";
import { Toast } from "../../components/toast/toast";
import { Typography } from "../../components/utils";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useUserStore } from "../../store/user";
import { formatDate } from "../../utils/date/format-date";
import { formatFullDate } from "../../utils/date/format-full-date";
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

type Props = NavigationProps & {
  getSaleLinkConfiguration: GetSaleLinkConfiguration;
  createSaleLink: CreateSaleLink;
  getOrderDetails: GetOrderDetails;
  finishAttendance: FinishAttendance;
};

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
  const maxInstallments = Math.floor(total / 50) || 1;

  return installmentsOptions.map((item) =>
    item.value > maxInstallments ? { ...item, disabled: true } : item
  );
};

export const SaleLinkAttendance = ({
  getSaleLinkConfiguration,
  createSaleLink,
  finishAttendance,
  getOrderDetails,
  navigation: { navigate },
}: Props) => {
  const { productList, clearAttendance, ...attendance } = useAttendanceStore();

  const { store } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [saleType, setSaleType] = useState(null);
  const [saleLinkProductList, setSaleLinkProductList] = useState(productList);
  const { control, handleSubmit } = useForm<FormValues>();

  const total = useMemo(
    () =>
      saleLinkProductList.reduce(
        (total, product) => total + product.amount * product.price,
        0
      ),
    [saleLinkProductList]
  );

  console.log(saleLinkProductList);

  const finishSaleLinkAttendance = async ({ installments }: FormValues) => {
    try {
      setFinishing(true);
      const attendanceId = attendance.id;

      await finishAttendance.execute({
        attendanceId: attendanceId,
        shipping: attendance.shipping,
        storeId: store.id,
        isSaleLink: true,
      });

      clearAttendance();

      const { code } = await getOrderDetails.execute({
        attendanceId: attendanceId,
        storeId: store.id,
      });

      const { message } = await createSaleLink.execute({
        orderId: code,
        saleType,
        storeId: store.id,
        expirationDate: formatDate({ date: new Date() }),
        installmentsNumber: String(installments),
        totalPrice: String(total),
        productList: saleLinkProductList.map((product) => ({
          id: product.code,
          totalPrice: String(product.totalPrice),
        })),
      });

      setFinishing(false);
      Toast({
        type: "success",
        title: "Sucesso!",
        message,
      });
      navigate("OrderDetails", { attendanceId });
    } catch (error) {
      setFinishing(false);

      console.error(error);

      Toast({
        type: "error",
        title: "Erro!",
        message: error.message,
      });
    }
  };

  const loadConfiguration = async () => {
    try {
      const { saleTypeList } = await getSaleLinkConfiguration.execute({
        storeId: store.id,
      });

      console.log(saleTypeList);

      setSaleType(saleTypeList.find((item) => item.default)?.value);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <Container>
      <FlatList
        data={saleLinkProductList}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <StyledListProduct
            {...item}
            borderless={index === saleLinkProductList.length - 1}
          />
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
        <StyledButton
          text={finishing ? "Finalizando" : "Finalizar"}
          disabled={loading || finishing}
          onPress={handleSubmit(finishSaleLinkAttendance)}
        />
      </Footer>
    </Container>
  );
};
