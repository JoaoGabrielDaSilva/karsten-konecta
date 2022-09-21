import styled from "styled-components/native";
import { Dimensions, Image as RnImage } from "react-native";
import { Skeleton } from "../../../skeleton/skeleton";

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

export const Image = styled(Skeleton)``;

export const FirstTitleLine = styled(Skeleton)``;

export const ThirdTitleLine = styled(Skeleton)``;

export const SecondTitleLine = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
`;

export const Code = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;

export const Ean = styled(Skeleton)`
  color: ${({ theme }) => theme.color.text.secondary};
`;
