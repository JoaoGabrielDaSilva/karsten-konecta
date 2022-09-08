import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

const AMOUNT_SIZE = 28;

export const Container = styled(Row)<{ borderless: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1px solid transparent;
  border-bottom-color: ${({ theme, borderless }) =>
    borderless ? "transparent" : theme.color.background.secondary};
`;

export const Left = styled.View``;

export const Right = styled.View`
  flex: 1;

  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;

export const ImageWrapper = styled.View`
  border: 0.5px solid ${({ theme }) => theme.color.background.inverted};

  padding: ${({ theme }) => theme.spacing.sm}px;

  border-radius: ${({ theme }) => theme.radii.md}px;

  width: ${width * 0.2}px;
  height: ${width * 0.2}px;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const AmountContainer = styled.View`
  width: ${AMOUNT_SIZE}px;
  height: ${AMOUNT_SIZE}px;

  justify-content: center;
  align-items: center;

  border-radius: ${AMOUNT_SIZE * 0.5}px;

  background-color: ${({ theme }) => theme.color.red[300]};

  position: absolute;
  right: -10px;
  top: -10px;
`;

export const Amount = styled(Typography)`
  color: ${({ theme }) => theme.color.white};

  font-size: ${({ theme }) => theme.fontSize.sm}px;
`;

export const Col = styled.View``;

export const Name = styled(Typography).attrs(() => ({
  bold: true,
}))``;

export const Label = styled(Typography).attrs(() => ({
  semibold: true,
}))`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Code = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
  margin: ${({ theme }) => theme.spacing.md}px 0px;
`;

export const Ean = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;
