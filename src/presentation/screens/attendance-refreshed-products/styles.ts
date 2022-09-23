import styled from "styled-components/native";
import { Button } from "../../components/buttons/button/button";
import { ListProduct } from "../../components/list/list-product/list-product";
import { SectionTitle, Typography } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;

export const EmptyListText = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};

  opacity: 0.7;
`;

export const StyledListProduct = styled(ListProduct)<{ removed?: boolean }>`
  opacity: ${({ removed }) => (removed ? 0.4 : 1)};
`;

export const StyledButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing.xxl}px
    ${({ theme }) => theme.spacing.lg}px;
`;
