import React from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { Container } from "./styles";

type Props = WebViewProps & {
  uri: string;
};

export const Webview = ({ uri, ...props }: Props) => {
  return (
    <Container>
      <WebView
        source={{
          uri,
        }}
        {...props}
      />
    </Container>
  );
};
