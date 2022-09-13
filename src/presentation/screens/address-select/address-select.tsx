import { faker } from "@faker-js/faker";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { AddressModel } from "../../../domain/models/address";
import { GetCustomerAddressList } from "../../../domain/usecases/customer/get-customer-address-list";
import { Button } from "../../components/buttons/button/button";
import { PaginatedList } from "../../components/list/paginated-list/paginated-list";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";
import {
  PaginatedListGetFunctionReturn,
  usePaginatedList,
} from "../../hooks/use-paginated-list";
import { Address } from "../../models/Address";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";

import { Container, Footer, StyledAddress } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AddressSelect"
>;

type Props = NavigationProps & {
  getCustomerAddressList: GetCustomerAddressList;
};

export const AddressSelect = ({
  navigation: { setOptions, goBack },
  getCustomerAddressList,
}: Props) => {
  const theme = useTheme();
  const { deliveryAddress, setAddress } = useAttendanceStore();
  const { data: customer } = useCustomerStore();

  const [selectedAddress, setSelectedAddress] = useState(deliveryAddress);

  const {
    data: addressList,
    loading,
    totalResults,
    refreshing,
    reset,
  } = usePaginatedList({ getFunction: loadAddressList });

  async function loadAddressList(): Promise<
    PaginatedListGetFunctionReturn<AddressModel>
  > {
    try {
      const { addressList } = await getCustomerAddressList.execute({
        id: customer.id,
      });

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
      setAddress({ address: selectedAddress });
      goBack();
    } catch (error) {
      console.log(error);
      goBack();
    }
  };

  useFocusEffect(() => {
    setOptions({
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
        loading={loading}
        refreshing={refreshing}
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
              selected={selectedAddress.id === item.id}
              borderless={index === addressList.length - 1}
              showMainLabel={false}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      />
      <Footer>
        <Button
          text="Selecionar"
          onPress={handleChangeAddress}
          disabled={selectedAddress.id === deliveryAddress?.id || loading}
        />
      </Footer>
    </Container>
  );
};
