import { yupResolver } from "@hookform/resolvers/yup";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CommonActions, StackActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { RemoteGetAttendance } from "../../../data/usecases/attendance/remote-get-attendance";
import { SalesModality } from "../../../domain/models/attendance";
import { CustomerModel } from "../../../domain/models/customer";
import { AttendanceProductModel } from "../../../domain/models/product";
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { DeleteAttendance } from "../../../domain/usecases/attendance/delete-attendance";
import { DeleteProduct } from "../../../domain/usecases/attendance/delete-product";
import { FinishAttendance } from "../../../domain/usecases/attendance/finish-attendance";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { LinkResponsibleToAttendance } from "../../../domain/usecases/attendance/link-responsible-to-attendance";
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
import { useProductListFiltersStore } from "../../store/product-list-filters";
import { useUserStore } from "../../store/user";
import { AttendanceAddress } from "./layout/attendance-address/attendance-address";
import { AttendanceEmptyIndicator } from "./layout/attendance-empty-indicator/attendance-empty-indicator";
import { AttendanceFooter } from "./layout/attendance-footer/attendance-footer";
import { AttendanceHeader } from "./layout/attendance-header/attendance-header";
import { orderResponsibleSchema } from "./schema";

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
  finishAttendance: FinishAttendance;
  linkResponsibleToAttendance: LinkResponsibleToAttendance;
};

type AttendanceFormValues = {
  hasResponsible: boolean;
  responsibleName: string;
  responsibleCpf: string;
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
  finishAttendance,
  linkResponsibleToAttendance,
}: Props) => {
  const params = route.params;

  console.log("params", params);

  const attendanceName = params?.name;

  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);

  const { store } = useUserStore();
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

  const { control, handleSubmit, watch } = useForm<AttendanceFormValues>({
    resolver: yupResolver(orderResponsibleSchema),
  });

  const hasResponsible = watch("hasResponsible");

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
        return await getAttendanceData({
          ...customer,
          id: String(customer.id),
        });
      }

      await getAttendanceData();
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendanceData = async (customer?: CustomerModel) => {
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
      } else {
        createNewAttendance();
      }
    } catch (error) {
      createNewAttendance();
      console.log(error);
    }
  };

  const createNewAttendance = async () => {
    try {
      const createdAttendance = await createAttendance.create({
        name: customer?.name ? customer.name : attendanceName,
        cpfCnpj: customer?.cpfCnpj,
        customerId: customer?.id,
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
      setUpdatingProduct(true);
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
        sum,
      });
    } catch (error) {
    } finally {
      setUpdatingProduct(false);
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

  const handleFinishAttendance = async (data: AttendanceFormValues) => {
    try {
      setFinishing(true);
      const { deletedProducts, updatedProducts } =
        await verifyAttendanceProducts.execute({
          attendanceId: attendance.id,
          saleModality: SalesModality.InfiniteShelf,
          storeId: store.id,
        });

      if (deletedProducts.length > 0 || updatedProducts.length > 0) {
        setFinishing(false);

        navigate("AttendanceRefreshedProducts", {
          refreshedProducts: updatedProducts.map((product) => ({
            ...product,
            amount: productList.find((item) => item.code === product.code)
              .amount,
          })),
          removedProducts: deletedProducts,
        });
        return;
      }

      if (data?.hasResponsible) {
        await linkResponsibleToAttendance.execute({
          attendanceId: attendance.id,
          storeId: store.id,
          responsibleCpf: data.responsibleCpf,
          responsibleName: data.responsibleName,
          deliveryAddressId: attendance.deliveryAddress.id,
          pickUpPointId: attendance?.pickUpAddress?.id,
          customerId: customer.id,
        });
      }

      const { splitMessage, wasSplitted } = await finishAttendance.execute({
        storeId: store.id,
        attendanceId: attendance.id,
        shipping: attendance.shipping,
      });

      if (wasSplitted) {
        Toast({
          type: "success",
          message: splitMessage,
          title: "Atenção!",
        });
      }
      navigate("OrderDetails", { attendanceId: attendance.id });
      clearAttendance();
    } catch (error) {
      Toast({
        type: "error",
        title: "Erro!",
        message: error.message,
      });
      console.log(error.response);
    } finally {
      setFinishing(false);
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
      title: `Carrinho(${
        !loading && !updatingProduct ? attendance.productAmount : "..."
      })`,
    });
  }, [attendance.productAmount, loading, updatingProduct]);

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackNavbar
          rightIconsDisabled={!attendance?.id}
          headerLeftIcon="close"
          onLeftIconPress={() => props.navigation.navigate("Sales")}
          rightIcon="text-search"
          onRightIconPress={() => {
            props.navigation.navigate("ProductList");
          }}
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
                  control={control}
                  getShippingInfo={getShippingInfo}
                  handleRemovePickUpAddress={handleRemovePickUpAddress}
                  loading={loading}
                  loadingShipping={loadingShipping}
                  setLoadingShipping={(loading) => setLoadingShipping(loading)}
                  hasResponsible={hasResponsible}
                />
              </>
            }
          />

          <AttendanceFooter
            loading={finishing}
            disabled={updatingProduct || loadingShipping || loading}
            handleDeleteAttendance={handleDeleteAttendance}
            handleFinishAttendance={() =>
              handleSubmit(handleFinishAttendance)()
            }
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
