import { DrawerContentScrollView } from "@react-navigation/drawer";
import styled from "styled-components/native";

export const Container = styled(DrawerContentScrollView)`
  background-color: ${({ theme }) => theme.color.background.primary};
`;
