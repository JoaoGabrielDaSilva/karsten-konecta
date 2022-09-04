import { DrawerContentScrollView } from "@react-navigation/drawer";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";

export const Container = styled(DrawerContentScrollView)`
  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const DrawerItemContainer = styled(Row)`
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;

  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

export const DrawerItemLabel = styled(Typography)<{ color: string }>`
  color: ${({ color }) => color};
`;
