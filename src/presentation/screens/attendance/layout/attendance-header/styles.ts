import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../../../components";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.lg}px;

  border: 1.5px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.background.secondary};
`;

export const UserIcon = styled(Feather)`
  margin-right: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.color.text.primary};

  font-size: ${({ theme }) => RFValue(theme.fontSize.md)}px;
`;

export const AttendanceName = styled(Typography)``;

export const DocumentNumber = styled(Typography)``;

export const CustomerActionLabel = styled(Typography)``;
