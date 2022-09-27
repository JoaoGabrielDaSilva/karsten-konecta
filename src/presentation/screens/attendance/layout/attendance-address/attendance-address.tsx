import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useMemo, useState } from "react";
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

const OWN_STORE_SHIPPING_COMPANIES = [
  "2e589f40-4434-409b-b7b4-e1f6e3325c6e", // Blumenau
  "cc041895-72cf-4ef5-94cd-f4f915193dda", // São José
  "67faba62-7f0a-4bcf-82d6-c557041665ed", // Balneario Camboriú
  "8555e625-1265-46d2-9d7e-e6c8f05a7c03", // Porto Belo
  "8b2924d3-4443-4e05-a828-7de4f88e7682", // Florianópolis
];

export const AttendanceAddress = ({
  loading,
  getShippingInfo,
  loadingShipping,
  setLoadingShipping,
  handleRemovePickUpAddress,
}: Props) => {
  const theme = useTheme();

  const {
    deliveryAddress,
    pickUpAddress,
    productList,
    toggleDeliveryMode,
    shipping: attendanceShipping,
    setShippingInfo,
  } = useAttendanceStore();
  const [localShippingInfo, setLocalShippingInfo] = useState<ShippingModel>({
    days: null,
    company: null,
  });

  const { control, handleSubmit, watch } = useForm<FormValues>();

  const responsible = watch("responsible");

  const totalWeight = useMemo(
    () => productList.reduce((acc, item) => acc + item.totalWeight, 0),
    [productList]
  );

  const { navigate } =
    useNavigation<
      StackNavigationProp<RootPrivateStackParamList, "Attendance", undefined>
    >();

  const loadShippingInfo = useCallback(
    async ({ cep }: FormValues) => {
      try {
        setLoadingShipping(true);
        Keyboard.dismiss();

        const isDedicated = pickUpAddress
          ? OWN_STORE_SHIPPING_COMPANIES.includes(pickUpAddress.id)
          : false;

        const shippingInfo = await getShippingInfo.get({
          cep: !isDedicated ? cep : pickUpAddress.cep,
          brandId: isDedicated ? "1" : "2",
          totalWeight: isDedicated && totalWeight < 1 ? 1 : totalWeight,
          isDedicated,
        });

        !deliveryAddress && !pickUpAddress
          ? setLocalShippingInfo(shippingInfo)
          : setShippingInfo(shippingInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingShipping(false);
      }
    },
    [productList, pickUpAddress]
  );

  useEffect(() => {
    if (!productList || productList.length === 0) return;

    const cep = watch("cep");

    if ((deliveryAddress && deliveryAddress?.cep) || cep) {
      loadShippingInfo({ cep: deliveryAddress?.cep || cep });
    }
  }, [productList, pickUpAddress]);

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
        {(loadingShipping ||
          localShippingInfo?.days ||
          attendanceShipping?.days) && (
          <StyledSectionTitle>Prazo de Entrega</StyledSectionTitle>
        )}
        {!loadingShipping ? (
          (attendanceShipping?.days || localShippingInfo?.days) && (
            <StyledShippingInfo
              {...(attendanceShipping || { ...localShippingInfo })}
            />
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
