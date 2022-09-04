import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { useTheme } from "styled-components/native";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { ShippingInfo } from "../../../../components/shipping-info/shipping-info";
import { ShippingModel } from "../../../../models/Shipping";
import { Container, Title } from "./styles";

type Props = {};

export const ShippingSection = ({}: Props) => {
  const { control } = useForm();
  const theme = useTheme();

  const [shippingInfo, setShippingInfo] = useState<ShippingModel>();
  const [loading, setLoading] = useState(false);

  const getShippingInfo = async (): Promise<void> => {
    setLoading(true);

    setTimeout(() => {
      setShippingInfo({
        days: 5,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Container>
      <Title>Calcule o Frete</Title>
      <TextInput
        control={control}
        name="cep"
        mask="cep"
        placeholder="CEP"
        loading={loading}
        onMaxLength={getShippingInfo}
      />
      {loading && <ActivityIndicator color={theme.color.background.inverted} />}
      {shippingInfo && <ShippingInfo {...shippingInfo} />}
    </Container>
  );
};
