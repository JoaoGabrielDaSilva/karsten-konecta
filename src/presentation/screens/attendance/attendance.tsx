import { DrawerScreenProps } from "@react-navigation/drawer";
import { CommonActions, StackActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { RemoteGetAttendance } from "../../../data/usecases/attendance/remote-get-attendance";
import { AttendanceProductModel } from "../../../domain/models/product";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { RetrieveAttendance } from "../../../domain/usecases/attendance/retrieve-attendance";
import { UpdateProductAmount } from "../../../domain/usecases/attendance/update-product-amount";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { Address } from "../../components/address/address";
import { Button } from "../../components/buttons/button/button";
import { AttendanceListProductLoader } from "../../components/list/attendance-list-product/loader/attendance-list-product-loader";
import { ShippingInfo } from "../../components/shipping-info/shipping-info";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { useUserStore } from "../../store/user";
import { AttendanceAddress } from "./layout/attendance-address/attendance-address";
import { AttendanceFooter } from "./layout/attendance-footer/attendance-footer";
import { AttendanceHeader } from "./layout/attendance-header/attendance-header";

import {
  Container,
  Content,
  DeleteAttendanceContainer,
  ListProduct,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "Attendance"
>;

type Props = NavigationProps & {
  getAttendance: GetAttendance;
  retrieveAttendance: RetrieveAttendance;
  createAttendance: CreateAttendance;
  getShippingInfo: GetShippingInfo;
  getCustomer: GetCustomer;
  updateProductAmount: UpdateProductAmount;
  deleteProduct: DeleteProduct;
};

export const Attendance = ({
  navigation: { navigate, setOptions },
  route,
  getAttendance,
  retrieveAttendance,
  createAttendance,
  getShippingInfo,
  getCustomer,
  updateProductAmount,
  deleteProduct,
}: Props) => {
  const params = route.params;

  const attendanceName = params?.name;

  const [loading, setLoading] = useState(true);
  const {
    productList,
    setAttendance,
    clearAttendance,
    refreshProductList,
    removeProduct,
  } = useAttendanceStore();
  const { data: customer, clearCustomer, setCustomer } = useCustomerStore();
  const { store } = useUserStore();

  const theme = useTheme();

  const loadAttendance = async (id: string) => {
    const attendance = await getAttendance.get({
      id: String(id),
      storeId: store.id,
    });

    setAttendance({
      ...attendance,
      id: String(id),
    });
    setLoading(false);
  };

  const loadData = async () => {
    try {
      if (!loading) setLoading(true);
      if (params?.cpfCnpj) {
        const customer = await getCustomer.get({
          storeId: store.id,
          cpfCnpj: params?.cpfCnpj,
        });

        setCustomer({
          ...customer,
          id: String(customer.id),
        });
      }

      await getAttendanceData();

      console.log("CUSTOMER", params);
    } catch (error) {
      console.log(error);
      await createNewAttendance();
    }
  };

  const getAttendanceData = async () => {
    try {
      if (params?.id) return loadAttendance(params.id);

      setLoading(true);
      if (customer?.cpfCnpj) {
        const retrievedAttendance = await retrieveAttendance.retrieve({
          cpfCnpj: customer.cpfCnpj,
          customerId: customer.id,
          storeId: store.id,
        });

        loadAttendance(retrievedAttendance.id);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createNewAttendance = async () => {
    try {
      const createdAttendance = await createAttendance.create({
        name: customer.name || attendanceName,
        cpfCnpj: customer.cpfCnpj,
        customerId: customer.id,
        storeId: store.id,
      });

      loadAttendance(createdAttendance.id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateAmount = async ({
    id,
    sum,
  }: {
    id: string;
    sum: boolean;
  }) => {
    try {
      const { id: productId, totalAmount } = await updateProductAmount.execute({
        id,
        sum,
        storeId: store.id,
      });

      const updatedProduct = productList.find((item) => item.id === id);

      console.log("UPDATED", totalAmount, updatedProduct);

      refreshProductList({
        id: productId,
        data: {
          amount: totalAmount,

          totalWeight: totalAmount * updatedProduct.weight,
          totalPrice: totalAmount * updatedProduct.price,
        },
      });
    } catch (error) {}
  };

  const handleDeleteProduct = async ({ id }: { id: string }) => {
    try {
      const { deletedProductId } = await deleteProduct.execute({
        id,
        storeId: store.id,
      });

      removeProduct({ id: deletedProductId });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(productList);

  console.log(
    productList.reduce(
      (acc, item) => ({
        amount: acc.amount + item.amount,
        totalPrice: acc.totalPrice + item.totalPrice,
        totalWeight: acc.totalWeight + item.totalWeight,
      }),
      { totalPrice: 0, totalWeight: 0, amount: 0 }
    )
  );

  useEffect(() => {
    loadData();

    return () => {
      clearAttendance();
      if (customer?.id) {
        clearCustomer();
      }
    };
  }, []);

  useEffect(() => {
    setOptions({
      title: `Carrinho(${productList.reduce(
        (acc, item) => acc + item.amount,
        0
      )})`,
    });
  }, [productList]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <Container>
        <AttendanceHeader loading={loading} />
        <Content>
          <FlatList
            bounces={false}
            data={productList}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{
              paddingVertical: theme.spacing.xl,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({
              item,
              index,
            }: ListRenderItemInfo<AttendanceProductModel>) =>
              !loading && (
                <ListProduct
                  {...item}
                  onPress={() =>
                    navigate("ProductDetails", {
                      code: item.code,
                      ean: item.ean,
                    })
                  }
                  onDelete={handleDeleteProduct}
                  onUpdateAmount={handleUpdateAmount}
                  borderless={productList.length - 1 === index}
                />
              )
            }
            ListFooterComponent={
              <>
                {loading && (
                  <>
                    <AttendanceListProductLoader />
                    <AttendanceListProductLoader />
                  </>
                )}
                {productList.length > 0 ||
                  (loading && (
                    <DeleteAttendanceContainer>
                      <Button
                        disabled={loading}
                        text="Excluir Atendimento"
                        onPress={() => {}}
                      />
                    </DeleteAttendanceContainer>
                  ))}
                <AttendanceAddress
                  getShippingInfo={getShippingInfo}
                  loading={loading}
                />
              </>
            }
          />

          <AttendanceFooter loading={loading} />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
