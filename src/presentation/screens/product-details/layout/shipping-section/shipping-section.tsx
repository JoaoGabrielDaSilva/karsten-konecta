import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { GetShippingInfo } from "../../../../../domain/usecases/shipping/get-shipping-info";
import { ShippingInfoLoader } from "../../../../components/shipping-info/loader/shipping-info-loader";
import { ShippingInfo } from "../../../../components/shipping-info/shipping-info";
import { ShippingModel } from "../../../../models/Shipping";
import { Container, StyledTextInput, Title } from "./styles";

type Props = {
  loading: boolean;
  getShippingInfo: GetShippingInfo;
};

type FormValues = {
  cep: string;
};

export const ShippingSection = ({ loading, getShippingInfo }: Props) => {
  const { control, handleSubmit } = useForm();

  const [shippingInfo, setShippingInfo] = useState<ShippingModel>();
  const [loadingShippingInfo, setLoadingShippingInfo] = useState(false);

  const loadShippingInfo = async ({ cep }: FormValues) => {
    try {
      setLoadingShippingInfo(true);
      const shippingInfo = await getShippingInfo.get({
        cep,
        brandId: "1",
        totalWeight: 10,
      });

      setShippingInfo(shippingInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingShippingInfo(false);
    }
  };

  return (
    <Container>
      <Title>Calcule o Frete</Title>

      <StyledTextInput
        control={control}
        name="cep"
        mask="cep"
        placeholder="CEP"
        loading={loadingShippingInfo}
        editable={!loading}
        onMaxLength={handleSubmit(loadShippingInfo)}
      />
      {loadingShippingInfo || shippingInfo ? (
        <Title>Prazo de Entrega</Title>
      ) : null}
      {loadingShippingInfo && <ShippingInfoLoader />}
      {shippingInfo && !loadingShippingInfo && (
        <ShippingInfo {...shippingInfo} />
      )}
    </Container>
  );
};
