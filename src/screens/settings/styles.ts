import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Typography } from "../../components";
import { ListRow } from "../../components/list/list-row/list-row";
import { ToggleListRow } from "../../components/list/toggle-list-row/toggle-list-row";
import { Navbar as NavbarBase } from "../../components/navbar/navbar";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Navbar = styled(NavbarBase)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const CustomListRow = styled(ToggleListRow)``;

export const SectionHeader = styled(Typography)`
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
`;
