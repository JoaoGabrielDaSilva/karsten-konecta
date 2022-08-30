import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Typography } from "../../components";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Title = styled(Typography)`
  font-size: ${RFValue(50)}px;
`;
