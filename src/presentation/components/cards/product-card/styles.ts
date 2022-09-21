import styled from "styled-components/native";
import { Dimensions, Image as RnImage } from "react-native";
import { Typography } from "../../utils";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  max-width: 250px;

  width: ${width * 0.5}px;
  height: ${width * 0.7}px;

  border-radius: ${({ theme }) => theme.radii.md}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const ImageWrapper = styled.View`
  width: 100%;
  height: 60%;
`;

export const InfoWrapper = styled.View``;

export const Image = styled(RnImage)`
  flex: 1;
`;

export const Title = styled(Typography)``;

export const Code = styled(Typography)`
  margin: ${({ theme }) => theme.spacing.md}px 0px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Ean = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;
