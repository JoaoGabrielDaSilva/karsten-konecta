import React from "react";
import WebView, { WebViewProps } from "react-native-webview";
import { Container } from "./styles";

export type WebviewProps = WebViewProps & {
  uri: string;
};

export const Webview = ({ uri, ...props }: WebviewProps) => {
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
