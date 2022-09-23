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
import { SalesModality } from "../../../domain/models/attendance";
import { AttendanceProductModel } from "../../../domain/models/product";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { DeleteAttendance } from "../../../domain/usecases/attendance/delete-attendance";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { RetrieveAttendance } from "../../../domain/usecases/attendance/retrieve-attendance";
import { UpdateAttendancePickUpAddress } from "../../../domain/usecases/attendance/update-attendance-pickup-address";
import { UpdateProductAmount } from "../../../domain/usecases/attendance/update-product-amount";
import { VerifyAttendanceProducts } from "../../../domain/usecases/attendance/verify-attendance-products";
import { GetCustomer } from "../../../domain/usecases/customer/get-customer";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { Address } from "../../components/address/address";
import { Button } from "../../components/buttons/button/button";
import { AttendanceListProductLoader } from "../../components/list/attendance-list-product/loader/attendance-list-product-loader";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import { ShippingInfo } from "../../components/shipping-info/shipping-info";
import { Toast } from "../../components/toast/toast";

import { RootPrivateStackParamList } from "../../routes";
import { DeliveryMode, useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { useUserStore } from "../../store/user";
import { AttendanceAddress } from "./layout/attendance-address/attendance-address";
import { AttendanceEmptyIndicator } from "./layout/attendance-empty-indicator/attendance-empty-indicator";
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
  deleteAttendance: DeleteAttendance;
  updatePickUpAddress: UpdateAttendancePickUpAddress;
  verifyAttendanceProducts: VerifyAttendanceProducts;
};

export const Attendance = ({
  navigation: { navigate, setOptions, reset },
  route,
  getAttendance,
  retrieveAttendance,
  createAttendance,
  getShippingInfo,
  getCustomer,
  updateProductAmount,
  deleteProduct,
  deleteAttendance,
  updatePickUpAddress,
  verifyAttendanceProducts,
}: Props) => {
  const params = route.params;

  const attendanceName = params?.name;

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [updtadingProduct, setUpdtadingProduct] = useState(false);
  const {
    productList,
    setAttendance,
    clearAttendance,
    refreshProductList,
    removeProduct,
    setAddressPickupAddress,
    ...attendance
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
    console.log("params", params);

    try {
      if (params?.cpfCnpj && !customer?.id) {
        if (!loading) setLoading(true);
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
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendanceData = async () => {
    try {
      if (params?.id) {
        setLoading(true);
        return loadAttendance(params.id);
      }

      if (customer?.cpfCnpj) {
        const retrievedAttendance = await retrieveAttendance.retrieve({
          cpfCnpj: customer.cpfCnpj,
          customerId: customer.id,
          storeId: store.id,
        });

        loadAttendance(retrievedAttendance.id);
      }
    } catch (error) {
      await createNewAttendance();
      console.log(error);
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
    } finally {
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
      setUpdtadingProduct(true);
      const { id: productId, totalAmount } = await updateProductAmount.execute({
        id,
        sum,
        storeId: store.id,
      });

      const updatedProduct = productList.find((item) => item.id === id);

      refreshProductList({
        id: productId,
        data: {
          amount: totalAmount,

          totalWeight: totalAmount * updatedProduct.weight,
          totalPrice: totalAmount * updatedProduct.price,
        },
      });
    } catch (error) {
    } finally {
      setUpdtadingProduct(false);
    }
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

  const handleVerifyAttendanceProducts = async () => {
    try {
      const { deletedProducts, updatedProducts } =
        await verifyAttendanceProducts.execute({
          attendanceId: attendance.id,
          saleModality: SalesModality.InfiniteShelf,
          storeId: store.id,
        });

      console.log(updatedProducts, deletedProducts);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteAttendance = async () => {
    try {
      setDeleting(true);
      await deleteAttendance.delete({
        id: attendance.id,
        storeId: store.id,
      });
      setDeleting(false);
      reset({
        routes: [{ name: "Sales" }],
      });
    } catch (error) {
      Toast({
        type: "error",
        title: "Erro!",
        message: "Houve um erro ao excluir atendimento! Tente novamente.",
      });
      setDeleting(false);
    }
  };

  const handleRemovePickUpAddress = async () => {
    await updatePickUpAddress.execute({
      addressId: undefined,
      attendanceId: attendance.id,
      storeId: store.id,
      customerId: customer.id,
    });
    setAddressPickupAddress({ address: null });
  };

  useEffect(() => {
    loadData();

    return () => {
      clearAttendance();
      clearCustomer();
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

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackNavbar
          rightIconsDisabled={!attendance?.id}
          headerLeftIcon="close"
          onLeftIconPress={() => props.navigation.navigate("Sales")}
          rightIcon="text-search"
          onRightIconPress={() => props.navigation.navigate("ProductList")}
          {...props}
        />
      ),
    });
  }, [attendance?.id]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <Container>
        <AttendanceHeader loading={loading} />
        {productList.length === 0 && !loading && <AttendanceEmptyIndicator />}
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
                {(productList.length > 0 || loading) && (
                  <DeleteAttendanceContainer>
                    <Button
                      disabled={loading}
                      loading={deleting}
                      text="Excluir Atendimento"
                      onPress={handleDeleteAttendance}
                    />
                  </DeleteAttendanceContainer>
                )}
                <AttendanceAddress
                  getShippingInfo={getShippingInfo}
                  handleRemovePickUpAddress={handleRemovePickUpAddress}
                  loading={loading}
                  loadingShipping={loadingShipping}
                  setLoadingShipping={(loading) => setLoadingShipping(loading)}
                />
              </>
            }
          />

          <AttendanceFooter
            loading={updtadingProduct || loadingShipping || loading}
            deleting={deleting}
            handleDeleteAttendance={handleDeleteAttendance}
            handleVerifyAttendanceProducts={handleVerifyAttendanceProducts}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
