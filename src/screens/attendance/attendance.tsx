import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useTheme } from "styled-components/native";
import { Address } from "../../components/address/address";
import { ShippingInfo } from "../../components/shipping-info/shipping-info";
import { AttendanceProductModel } from "../../models/Attendance";

import { RootPrivateDrawerParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { AttendanceFooter } from "./layout/attendance-footer/attendance-footer";
import { AttendanceHeader } from "./layout/attendance-header/attendance-header";

import { Container, Content, ListProduct } from "./styles";

type NavigationProps = DrawerScreenProps<
  RootPrivateDrawerParamList,
  "Attendance"
>;

type Props = NavigationProps;

export const Attendance = ({}: Props) => {
  const { loading, productList, address, shippingInfo, getAttendance } =
    useAttendanceStore();

  const theme = useTheme();

  useEffect(() => getAttendance(), []);

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
            <ListProduct
              {...item}
              borderless={productList.length - 1 === index}
            />
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
