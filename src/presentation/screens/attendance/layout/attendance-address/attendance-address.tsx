import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GetShippingInfo } from "../../../../../domain/usecases/shipping/get-shipping-info";
import {
  Direction,
  LabelToggleButton,
} from "../../../../components/buttons/label-toggle-button/label-toggle-button";

import { RootPrivateStackParamList } from "../../../../routes";
import { useAttendanceStore } from "../../../../store/attendance";

import {
  Form,
  StyledTextInput,
  StyledSectionTitle,
  StyledAddress,
  StyledShippingInfo,
  StyledAddressLoader,
  StyledShippingInfoLoader,
  DeliveryModeContainer,
} from "./styles";

type Props = {
  loading: boolean;
  getShippingInfo: GetShippingInfo;
};

type FormValues = {
  cep: string;
};

export const AttendanceAddress = ({ loading, getShippingInfo }: Props) => {
  const [loadingShipping, setLoadingShipping] = useState(false);

  const {
    deliveryAddress,
    productList,
    shippingInfo: attendanceShippingInfo,
    toggleDeliveryMode,
  } = useAttendanceStore();
  const [localShippingInfo, setLocalShippingInfo] = useState(null);

  const shippingInfo = deliveryAddress
    ? attendanceShippingInfo
    : localShippingInfo;

  const { control, handleSubmit } = useForm();
  const { navigate } =
    useNavigation<
      StackNavigationProp<RootPrivateStackParamList, "Attendance", undefined>
    >();

  const loadShippingInfo = async ({ cep }: FormValues) => {
    try {
      setLoadingShipping(true);
      Keyboard.dismiss();

      const shippingInfo = await getShippingInfo.get({
        cep,
        brandId: "2",
        totalWeight: 10,
      });

      setLocalShippingInfo(shippingInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingShipping(false);
    }
  };

  useEffect(() => {
    if (deliveryAddress && deliveryAddress.cep) {
      loadShippingInfo({ cep: deliveryAddress.cep });
    }
  }, []);

  return !loading ? (
    productList.length > 0 ? (
      <>
        {deliveryAddress ? (
          <>
            <StyledSectionTitle>Endereço de Entrega</StyledSectionTitle>
            <DeliveryModeContainer>
              <LabelToggleButton
                leftLabel="Receber"
                rightLabel="Retirar"
                onSelect={(direction) => {
                  toggleDeliveryMode();
                  if (direction === Direction.RIGHT)
                    return navigate("AddressSelect");
                }}
              />
            </DeliveryModeContainer>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate("AddressSelect")}
            >
              <StyledAddress
                {...deliveryAddress}
                showMainLabel={false}
                editable
              />
            </TouchableOpacity>
          </>
        ) : (
          <Form>
            <StyledSectionTitle>Calcule o Frete</StyledSectionTitle>
            <StyledTextInput
              control={control}
              name="cep"
              mask="cep"
              placeholder="CEP"
              onMaxLength={handleSubmit(loadShippingInfo)}
            />
          </Form>
        )}
        {(loadingShipping || shippingInfo) && (
          <StyledSectionTitle>Prazo de Entrega</StyledSectionTitle>
        )}
        {!loadingShipping ? (
          shippingInfo?.days && <StyledShippingInfo {...shippingInfo} />
        ) : (
          <StyledShippingInfoLoader />
        )}
      </>
    ) : null
  ) : (
    <>
      <StyledSectionTitle>Endereço de Entrega</StyledSectionTitle>
      <StyledAddressLoader editable />
      <StyledSectionTitle>Prazo de Entrega</StyledSectionTitle>
      <StyledShippingInfoLoader />
    </>
  );
};
