import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { ShippingModel } from "../../../../../domain/models/shipping";
import { GetShippingInfo } from "../../../../../domain/usecases/shipping/get-shipping-info";
import { Collapsible } from "../../../../components/animated/test/Collapsible/Collapsible";
import { Button } from "../../../../components/buttons/button/button";
import {
  Direction,
  LabelToggleButton,
} from "../../../../components/buttons/label-toggle-button/label-toggle-button";
import { Checkbox } from "../../../../components/form/checkbox/checkbox";
import { TextInput } from "../../../../components/form/text-input/text-input";

import { RootPrivateStackParamList } from "../../../../routes";
import { DeliveryMode, useAttendanceStore } from "../../../../store/attendance";

import {
  Form,
  StyledTextInput,
  StyledSectionTitle,
  StyledAddress,
  StyledShippingInfo,
  StyledAddressLoader,
  StyledShippingInfoLoader,
  DeliveryModeContainer,
  StyledSectionTitleLoader,
  ResponsibleForm,
} from "./styles";

type Props = {
  loading: boolean;
  getShippingInfo: GetShippingInfo;
  handleRemovePickUpAddress: () => Promise<void>;
  setLoadingShipping: (loading: boolean) => void;
  loadingShipping: boolean;
};

type FormValues = {
  cep: string;
  responsible?: string;
};

export const AttendanceAddress = ({
  loading,
  getShippingInfo,
  loadingShipping,
  setLoadingShipping,
  handleRemovePickUpAddress,
}: Props) => {
  const theme = useTheme();

  const { deliveryAddress, pickUpAddress, productList, toggleDeliveryMode } =
    useAttendanceStore();
  const [localShippingInfo, setLocalShippingInfo] = useState<ShippingModel>({
    days: null,
  });

  const { control, handleSubmit, watch } = useForm<FormValues>();

  const responsible = watch("responsible");

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
    if (productList.length === 0) return;

    const cep = watch("cep");

    if ((deliveryAddress && deliveryAddress?.cep) || cep) {
      loadShippingInfo({ cep: deliveryAddress?.cep || cep });
    }
  }, [productList]);

  return !loading ? (
    productList.length > 0 ? (
      <>
        {deliveryAddress || pickUpAddress ? (
          <>
            <StyledSectionTitle>
              Endereço de {pickUpAddress ? "Retirada" : "Entrega"}
            </StyledSectionTitle>
            <DeliveryModeContainer>
              <LabelToggleButton
                leftLabel="Receber"
                rightLabel="Retirar"
                defaultValue={pickUpAddress ? Direction.RIGHT : Direction.LEFT}
                onSelect={async (direction) => {
                  console.log(direction);

                  toggleDeliveryMode();
                  if (direction === Direction.RIGHT)
                    return navigate("AddressSelect", {
                      deliveryMode: DeliveryMode.PICK_UP,
                    });

                  await handleRemovePickUpAddress();
                }}
              />
            </DeliveryModeContainer>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigate("AddressSelect", {
                  deliveryMode: DeliveryMode.DELIVERY,
                })
              }
            >
              <StyledAddress
                {...(pickUpAddress
                  ? { ...pickUpAddress }
                  : { ...deliveryAddress })}
                showMainLabel={false}
                editable
              />
            </TouchableOpacity>
            {pickUpAddress ? (
              <>
                <ResponsibleForm>
                  <Checkbox
                    label="Responsável pela retirada"
                    control={control}
                    name="responsible"
                  />
                  {!!responsible && (
                    <>
                      <TextInput
                        control={control}
                        name="name"
                        placeholder="Nome do responsável"
                        style={{ marginVertical: 15 }}
                      />
                      <TextInput
                        control={control}
                        name="cpf"
                        placeholder="CPF"
                        mask="cpf"
                      />
                    </>
                  )}
                </ResponsibleForm>
              </>
            ) : null}
          </>
        ) : (
          <Form>
            <StyledSectionTitle>Calcule o Frete</StyledSectionTitle>
            <StyledTextInput
              control={control}
              name="cep"
              mask="cep"
              placeholder="CEP"
              onMaxLength={() => handleSubmit(loadShippingInfo)()}
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
      <StyledSectionTitleLoader width={150} height={20} />
      <StyledAddressLoader editable />
      <StyledSectionTitleLoader width={150} height={20} />
      <StyledShippingInfoLoader />
    </>
  );
};
