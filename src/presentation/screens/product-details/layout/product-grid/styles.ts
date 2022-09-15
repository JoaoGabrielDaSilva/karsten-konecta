import styled from "styled-components/native";
import { Typography } from "../../../../components/utils";
import { Dimensions, Image as RnImage } from "react-native";

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

const { width } = Dimensions.get("window");

export const SectionTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const ImageWrapper = styled.View<{ selected?: boolean }>`
  margin-right: ${({ theme }) => theme.spacing.lg}px;

  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.color.focused : theme.color.unfocused};
  padding: ${({ theme }) => theme.spacing.sm}px;

  border-radius: ${({ theme }) => theme.radii.md}px;

  width: ${width * 0.18}px;
  height: ${width * 0.18}px;
`;

export const Image = styled(RnImage)`
  flex: 1;
`;

export const SizeWrapper = styled.View<{ selected?: boolean }>`
  margin-right: ${({ theme }) => theme.spacing.lg}px;

  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.xxl}px;
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.color.background.emphasis
      : theme.color.background.primary};

  border: 1px solid ${({ theme }) => theme.color.background.emphasis};

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const SizeText = styled(Typography)<{ selected?: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.color.text.inverted : theme.color.text.secondary};
`;
