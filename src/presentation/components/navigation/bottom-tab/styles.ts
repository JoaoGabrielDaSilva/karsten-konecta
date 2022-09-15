import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row)`
  width: 100%;
  height: 90px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 1px solid ${({ theme }) => theme.color.unfocused};
`;

export const Route = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;

  opacity: ${({ active }) => (active ? 1 : 0.35)};
`;

export const RouteIcon = styled(Ionicons)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;
  color: ${({ theme }) => theme.color.text.primary};

  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;
export const RouteName = styled(Typography)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xsm)}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
