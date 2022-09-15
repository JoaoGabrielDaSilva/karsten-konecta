import styled from "styled-components/native";
import { ListRow } from "../../components/list/list-row/list-row";
import { Typography } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const HistoryItem = styled(ListRow)``;

export const NoResultsFound = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
  color: ${({ theme }) => theme.color.text.secondary};
`;
