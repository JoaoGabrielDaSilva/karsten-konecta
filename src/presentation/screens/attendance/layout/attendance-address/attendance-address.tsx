import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ShippingModel } from "../../../../../domain/models/shipping";
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

  const { deliveryAddress, productList, toggleDeliveryMode } =
    useAttendanceStore();
  const [localShippingInfo, setLocalShippingInfo] = useState<ShippingModel>({
    days: null,
  });

  const { control, handleSubmit, watch } = useForm<{ cep: string }>();

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
        totalWeight: productList.reduce(
          (acc, item) => acc + item.totalWeight,
          0
        ),
      });

      console.log(shippingInfo);

      setLocalShippingInfo(shippingInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingShipping(false);
    }
  };

  useEffect(() => {
    const cep = watch("cep");

    if ((deliveryAddress && deliveryAddress?.cep) || cep) {
      loadShippingInfo({ cep: deliveryAddress?.cep || cep });
    }
  }, [productList]);

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
        {(loadingShipping || localShippingInfo?.days) && (
          <StyledSectionTitle>Prazo de Entrega</StyledSectionTitle>
        )}
        {!loadingShipping ? (
          localShippingInfo?.days && (
            <StyledShippingInfo {...localShippingInfo} />
          )
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
