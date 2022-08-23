import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("screen");

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => `${theme.spacing.xl}px 0px`};
`;

export const Image = styled.Image`
  width: ${width * 0.125}px;
  height: ${width * 0.125}px;

  margin-right: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${width * 0.125}px;
`;

export const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Sender = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Content = styled(Typography)`
  max-width: 90%;
`;

export const Date = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing.md}px;
  align-self: flex-end;
`;
