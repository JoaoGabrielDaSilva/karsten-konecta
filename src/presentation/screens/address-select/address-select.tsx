import { faker } from "@faker-js/faker";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { CustomerAddressModel } from "../../../domain/models/address";
import { StoreAddressModel } from "../../../domain/models/store-address-model";
import { UpdateAttendanceDeliveryAddress } from "../../../domain/usecases/attendance/update-attendance-delivery-address";
import { UpdateAttendancePickUpAddress } from "../../../domain/usecases/attendance/update-attendance-pickup-address";
import { GetCustomerAddressList } from "../../../domain/usecases/customer/get-customer-address-list";
import { GetStoreAddressList } from "../../../domain/usecases/store/get-store-address-list";
import { AddressLoader } from "../../components/address/loader/address-loader";
import { Button } from "../../components/buttons/button/button";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { Address } from "../../models/Address";
import { RootPrivateStackParamList } from "../../routes";
import { DeliveryMode, useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { useUserStore } from "../../store/user";

import {
  Container,
  Footer,
  StyledAddress,
  StyledAddressLoader,
} from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AddressSelect"
>;

type Props = NavigationProps & {
  getCustomerAddressList: GetCustomerAddressList;
  updateAttendanceDeliveryAddress: UpdateAttendanceDeliveryAddress;
  getStoreAddressList: GetStoreAddressList;
  updateAttendancePickupAddress: UpdateAttendancePickUpAddress;
};

export const AddressSelect = ({
  navigation: { setOptions, goBack },
  route,
  getCustomerAddressList,
  updateAttendanceDeliveryAddress,
  getStoreAddressList,
  updateAttendancePickupAddress,
}: Props) => {
  const { deliveryMode } = route.params;

  const theme = useTheme();
  const {
    deliveryAddress,
    pickUpAddress,
    setAddressDeliveryAddress,
    setAddressPickupAddress,
    ...attendance
  } = useAttendanceStore();
  const { data: customer } = useCustomerStore();
  const { store } = useUserStore();

  const [selectedAddress, setSelectedAddress] = useState<
    CustomerAddressModel | StoreAddressModel
  >(deliveryMode === DeliveryMode.DELIVERY ? deliveryAddress : pickUpAddress);

  const {
    data: addressList,
    loading,
    totalResults,
    refreshing,
    reset,
    page,
  } = usePaginatedList({ getFunction: loadAddressList });

  async function loadAddressList(): Promise<
    PaginatedListGetFunctionReturn<CustomerAddressModel | StoreAddressModel>
  > {
    try {
      const { addressList } =
        deliveryMode === DeliveryMode.DELIVERY
          ? await getCustomerAddressList.execute({
              id: customer.id,
            })
          : await getStoreAddressList.execute();

      console.log(addressList);

      return {
        data: addressList,
        totalResults: addressList.length,
      };
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeAddress = async () => {
    try {
      const payload:
        | UpdateAttendanceDeliveryAddress.Params
        | UpdateAttendancePickUpAddress.Params = {
        storeId: store.id,
        addressId: selectedAddress.id,
        attendanceId: attendance.id,
        customerId: customer.id,
      };

      if (deliveryMode === DeliveryMode.DELIVERY) {
        await updateAttendanceDeliveryAddress.execute({
          ...payload,
        });
        return setAddressDeliveryAddress({ address: selectedAddress });
      }

      await updateAttendancePickupAddress.execute({
        ...payload,
      });
      setAddressPickupAddress({
        address: "instructions" in selectedAddress && { ...selectedAddress },
      });

      goBack();
    } catch (error) {
      console.log(error);
      goBack();
    }
  };

  console.log(selectedAddress);

  useFocusEffect(() => {
    setOptions({
      title: `Selecionar endereço de ${
        deliveryMode === DeliveryMode.DELIVERY ? "entrega" : "retirada"
      }`,
      header: (props) => (
        <StackNavbar
          rightIcon="plus"
          onRightIconPress={() => props.navigation.navigate("AddressRegister")}
          {...props}
        />
      ),
    });
  });

  return (
    <Container>
      <PaginatedList
        data={addressList}
        page={page}
        loading={loading}
        refreshing={refreshing}
        enableRefresh
        onRefresh={() => reset({ refresh: true })}
        totalResults={totalResults}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }: ListRenderItemInfo<Address>) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedAddress(item)}
          >
            <StyledAddress
              {...item}
              selectable
              selected={selectedAddress && selectedAddress.id === item.id}
              borderless={index === addressList.length - 1}
              showMainLabel={false}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        loaderComponent={<StyledAddressLoader selectable />}
        showsVerticalScrollIndicator={false}
      />
      <Footer>
        <Button
          text="Selecionar"
          onPress={handleChangeAddress}
          disabled={
            !selectedAddress ||
            (selectedAddress &&
              (selectedAddress.id === deliveryAddress?.id ||
                (pickUpAddress && selectedAddress.id === pickUpAddress.id))) ||
            loading
          }
        />
      </Footer>
    </Container>
  );
};
