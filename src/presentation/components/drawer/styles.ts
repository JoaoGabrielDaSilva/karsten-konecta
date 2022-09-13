import { DrawerContentScrollView } from "@react-navigation/drawer";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../utils";
import { SectionTitle } from "../utils/section-title/section-title";
import { ListRow } from "../list/list-row/list-row";

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

export const StyledSectionTitle = styled(SectionTitle)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  font-size: ${({ theme }) => RFValue(theme.fontSize.sm)}px;
`;

export const MenuItem = styled(ListRow)``;

export const LogoutListRow = styled(ListRow)`
  padding: ${({ theme }) => theme.spacing.md}px 0px;
  margin-top: ${({ theme }) => theme.spacing.xxl * 2}px;
  background-color: ${({ theme }) => theme.color.red[100]};
`;

export const Version = styled(Typography)`
  text-align: center;

  color: ${({ theme }) => theme.color.text.secondary};
  margin: ${({ theme }) => theme.spacing.xxl}px 0px;
`;
