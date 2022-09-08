import { faker } from "@faker-js/faker";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { Address } from "../../models/Address";
import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";

import { Container, Footer, StyledAddress } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AddressSelect"
>;

type Props = NavigationProps;

const addressList = [
  {
    id: "1",
    name: "João",
    street: faker.address.street(),
    city: faker.address.city(),
    district: "Feitoria",
    number: faker.address.buildingNumber(),
    reference: "Perto de tal lugar",
    complement: "Casa",
    state: "RS",
    cep: "93054-190",
    isMain: true,
  },
  {
    id: "2",
    name: "João",
    street: faker.address.street(),
    city: faker.address.city(),
    district: "Feitoria",
    number: faker.address.buildingNumber(),
    reference: "Perto de tal lugar",
    complement: "Casa",
    state: "RS",
    cep: "93054-190",
    isMain: false,
  },
  {
    id: "3",
    name: "João",
    street: faker.address.street(),
    city: faker.address.city(),
    district: "Feitoria",
    number: faker.address.buildingNumber(),
    reference: "Perto de tal lugar",
    complement: "Casa",
    state: "RS",
    cep: "93054-190",
    isMain: false,
  },
];

export const AddressSelect = ({ navigation }: Props) => {
  const theme = useTheme();
  const { address, setAddress } = useAttendanceStore();

  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(address);

  const handleChangeAddress = async () => {
    try {
      setAddress({ address: selectedAddress });
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigation.goBack();
    }
  };

  return (
    <Container>
      <FlatList
        data={addressList}
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
          disabled={selectedAddress.id === address.id}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};
