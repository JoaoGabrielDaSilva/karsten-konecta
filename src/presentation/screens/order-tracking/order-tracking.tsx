import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../routes";

import { Container } from "./styles";
import { Webview } from "../../components/webview/webview";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "OrderTracking"
>;

type Props = NavigationProps;

export const OrderTracking = ({ route }: Props) => {
  const { url } = route.params;

  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  return (
    <Container>
      {loading && <ActivityIndicator color={theme.color.text.primary} />}
      <Webview uri={url} onLoad={() => setLoading(false)} />
    </Container>
  );
};
