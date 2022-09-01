import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Row } from "../../utils";

export const StyledRow = styled(Row)`
  align-self: flex-start;
`;

export const Container = styled.View`
  margin-right: ${({ theme }) => theme.spacing.md}px;

  width: 25px;
  height: 25px;

  border: 1px solid ${({ theme }) => theme.color.background.emphasis};
  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

export const Fill = styled.View<{ active: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, active }) =>
    active ? theme.color.background.emphasis : theme.color.background.primary};
`;

export const Check = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fontSize.xl}px;

  color: ${({ theme }) => theme.color.text.inverted};
`;
