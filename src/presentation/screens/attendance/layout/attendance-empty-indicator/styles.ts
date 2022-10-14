import styled from "styled-components/native";
import { Typography } from "../../../../components/utils";

export const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  align-items: center;
`;
export const SubTitle = styled(Typography)`
  padding: 0 20px;

  color: ${({ theme }) => theme.color.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
`;

export const Title = styled(Typography)`
  margin: 20px 0;

  color: ${({ theme }) => theme.color.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
`;
