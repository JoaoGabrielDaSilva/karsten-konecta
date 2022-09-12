import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";

export const Container = styled(Row)`
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.color.background.emphasis};

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Label = styled(Typography)`
  color: ${({ theme }) => theme.color.white};
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => theme.color.white};
`;

export const RemoveIcon = styled(MaterialCommunityIcons)`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.color.white};
`;
