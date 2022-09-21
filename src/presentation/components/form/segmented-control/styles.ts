import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  border-radius: ${({ theme }) => theme.radii.md}px;

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.color.unfocused};
`;

export const Label = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.sm)}px;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Option = styled(Typography)<{ isSelected: boolean }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.text.inverted : theme.color.text.secondary};

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.background.emphasis : "transparent"};
`;
