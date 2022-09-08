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
import { CreateAttendance } from "../../../domain/usecases/attendance/create-attendance";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";
import { RetrieveAttendance } from "../../../domain/usecases/attendance/retrieve-attendance";
import { GetShippingInfo } from "../../../domain/usecases/shipping/get-shipping-info";
import { Address } from "../../components/address/address";
import { AttendanceListProductLoader } from "../../components/list/attendance-list-product/loader/attendance-list-product-loader";
import { ShippingInfo } from "../../components/shipping-info/shipping-info";
import { AttendanceProductModel } from "../../models/Attendance";

import { RootPrivateStackParamList } from "../../routes";
import { useAttendanceStore } from "../../store/attendance";
import { useCustomerStore } from "../../store/customer";
import { AttendanceAddress } from "./layout/attendance-address/attendance-address";
import { AttendanceFooter } from "./layout/attendance-footer/attendance-footer";
import { AttendanceHeader } from "./layout/attendance-header/attendance-header";

import { Container, Content, ListProduct } from "./styles";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "Attendance"
>;

type Props = NavigationProps & {
  getAttendance: GetAttendance;
  retrieveAttendance: RetrieveAttendance;
  createAttendance: CreateAttendance;
  getShippingInfo: GetShippingInfo;
};

export const Attendance = ({
  navigation: { navigate },
  route,
  getAttendance,
  retrieveAttendance,
  createAttendance,
  getShippingInfo,
}: Props) => {
  const attendanceName = route.params?.name;

  const [loading, setLoading] = useState(true);
  const { productList, setAttendance } = useAttendanceStore();
  const { data: customer } = useCustomerStore();

  const theme = useTheme();

  const loadAttendance = async (id: string) => {
    const attendance = await getAttendance.get({
      id: String(id),
      storeId: "28",
    });

    setAttendance({
      ...attendance,
      id: String(id),
      shippingInfo: { days: 5 },
      deliveryAddress: null,
    });
    setLoading(false);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const retrievedAttendance = await retrieveAttendance.retrieve({
        cpfCnpj: customer.cpfCnpj,
        customerId: customer.id,
        storeId: "28",
      });

      loadAttendance(retrievedAttendance.id);
    } catch (error) {
      console.log(error);
      const createdAttendance = await createAttendance.create({
        name: customer.name || attendanceName,
        cpfCnpj: customer.cpfCnpj,
        customerId: customer.id,
        storeId: "28",
      });

      loadAttendance(createdAttendance.id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
                <BorderlessButton
                  onPress={() =>
                    navigate("ProductDetails", {
                      code: item.code,
                      ean: item.ean,
                    })
                  }
                >
                  <ListProduct
                    {...item}
                    borderless={productList.length - 1 === index}
                  />
                </BorderlessButton>
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
