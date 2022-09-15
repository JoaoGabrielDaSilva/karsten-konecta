import styled from "styled-components/native";
import { ListRow } from "../../components/list/list-row/list-row";

export const Container = styled.View`
  flex: 1;

  padding-top: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.secondary};

  justify-content: space-between;
`;

export const ItemContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const MenuItem = styled(ListRow).attrs(({ theme }) => ({
  color: theme.color.text.primary,
}))`
  padding: ${({ theme }) => theme.spacing.xxl}px 0px;
`;
