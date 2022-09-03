import styled from "styled-components/native";
import { ListRow } from "../../components/list/list-row/list-row";

export const Container = styled.View`
  flex: 1;

  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const MenuItem = styled(ListRow).attrs(({ theme }) => ({
  color: theme.color.text.primary,
}))`
  padding: ${({ theme }) => theme.spacing.xxl}px 0px;
`;
