import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Skeleton } from "../../../../components/skeleton/skeleton";
import { Row, Typography } from "../../../../components/utils";

export const Container = styled(Row)`
  min-height: 50px;
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.sm}px
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

export const AttendanceDocument = styled(Typography)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xsm)}px;
`;

export const DocumentNumber = styled(Typography)``;

export const CustomerActionLabel = styled(Typography)``;

export const DocumentLoader = styled(Skeleton)`
  margin-top: 2.5px;
`;
