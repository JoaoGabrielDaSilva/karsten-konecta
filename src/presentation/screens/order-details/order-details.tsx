import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { GetOrderDetails } from "../../../domain/usecases/order/get-order-details";
import { RootPrivateStackParamList } from "../../routes";
import {
  Container,
  Content,
  HeaderIcon,
  StyledAddress,
  StyledListProduct,
  StyledListProductLoader,
  StyledListRow,
  StyledListRowLoader,
  StyledSectionTitle,
} from "./styles";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useUserStore } from "../../store/user";
import { useTheme } from "styled-components/native";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import { StyledSectionTitleLoader } from "../attendance/layout/attendance-address/styles";
import { cpfMask } from "../../utils/mask/cpf-mask";
import { Row } from "../../components/utils";
import { ToolTip } from "../../components/tooltip/Tooltip";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "OrderDetails"
>;

type Props = NavigationProps & {
  getOrderDetails: GetOrderDetails;
};

export const OrderDetails = ({
  navigation: { setOptions, reset },
  route,
  getOrderDetails,
}: Props) => {
  const { attendanceId } = route.params;

  const theme = useTheme();
  const { store } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<GetOrderDetails.Model>();

  const loadOrderData = async () => {
    try {
      setLoading(true);
      const order = await getOrderDetails.execute({
        storeId: store.id,
        attendanceId,
      });

      setOrder(order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackNavbar
          rightIcon="map-marker-outline"
          onLeftIconPress={() =>
            reset({
              routes: [{ name: "Sales" }],
            })
          }
          renderHeaderRight={() => (
            <Row align="center">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate("OrderTracking", {
                    url: order?.trackingURL,
                  })
                }
              >
                <HeaderIcon name="map-marker-outline" />
              </TouchableOpacity>

              <ToolTip
                placement="bottom"
                backgroundColor="transparent"
                content={
                  <View>
                    <Text>123</Text>
                  </View>
                }
              >
                <HeaderIcon name="dots-vertical" />
              </ToolTip>
            </Row>
          )}
          {...props}
        />
      ),
    });
  }, [order]);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: theme.spacing.xxl,
        }}
      >
        {!loading ? (
          <>
            <StyledSectionTitle>Dados do Pedido</StyledSectionTitle>
            <Content>
              <StyledListRow label="Código" value={order?.code} />
              <StyledListRow label="Status" value={order?.status} />
              <StyledListRow label="Data de emissão" value={order?.createdAt} />
              <StyledListRow
                label="Previsão de entrega"
                value={order?.deliveryForecast}
              />
              <StyledListRow
                label={order.isPickUp ? "Responsável" : "Cliente"}
                value={
                  order.isPickUp && order?.responsibleName
                    ? order.responsibleName
                    : order?.customer?.name
                }
              />
              <StyledListRow
                label="CPF"
                value={cpfMask(
                  order.isPickUp && order?.responsibleCpf
                    ? order.responsibleCpf
                    : order?.customer?.cpf
                )}
                borderless
              />
            </Content>
            <StyledSectionTitle>
              Endereço de {`${order?.isPickUp ? "Retirada" : "Entrega"}`}
            </StyledSectionTitle>
            <StyledAddress {...order?.address} showRightArrow={false} />
            <StyledSectionTitle>Itens do pedido</StyledSectionTitle>
            {order &&
              order.productList.map((product) => (
                <StyledListProduct key={product.code} {...product} />
              ))}
          </>
        ) : (
          <>
            <StyledSectionTitleLoader width={150} height={20} variant="dark" />
            <StyledListRowLoader />
            <StyledListRowLoader />
            <StyledListRowLoader />
            <StyledListRowLoader />
            <StyledListRowLoader />
            <StyledListRowLoader borderless />
            <StyledSectionTitleLoader width={200} height={20} variant="dark" />

            <StyledListProductLoader />
          </>
        )}
      </ScrollView>
    </Container>
  );
};
