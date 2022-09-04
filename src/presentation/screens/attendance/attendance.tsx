import { DrawerScreenProps } from "@react-navigation/drawer";
import { CommonActions, StackActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { RemoteGetAttendance } from "../../../data/usecases/attendance/get-attendance";
import { Address } from "../../components/address/address";
import { ShippingInfo } from "../../components/shipping-info/shipping-info";
import { AttendanceProductModel } from "../../models/Attendance";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { AttendanceFooter } from "./layout/attendance-footer/attendance-footer";
import { AttendanceHeader } from "./layout/attendance-header/attendance-header";

import { Container, Content, ListProduct } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "Attendance"
>;

type Props = NavigationProps & {
  getAttendance: RemoteGetAttendance;
};

export const Attendance = ({
  navigation: { navigate },
  getAttendance,
}: Props) => {
  const { productList, address, shippingInfo, setAttendance } =
    useAttendanceStore();

  const loadData = async () => {
    const attendance = await getAttendance.get();

    setAttendance({ ...attendance });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <AttendanceHeader />
      <Content>
        <FlatList
          bounces={false}
          data={productList}
          keyExtractor={(_, index) => String(index)}
          renderItem={({
            item,
            index,
          }: ListRenderItemInfo<AttendanceProductModel>) => (
            <BorderlessButton onPress={() => navigate("ProductDetails")}>
              <ListProduct
                {...item}
                borderless={productList.length - 1 === index}
              />
            </BorderlessButton>
          )}
          ListFooterComponent={
            <>
              {address && <Address {...address} editable />}
              {shippingInfo && <ShippingInfo {...shippingInfo} />}
            </>
          }
        />
        <AttendanceFooter />
      </Content>
    </Container>
  );
};
