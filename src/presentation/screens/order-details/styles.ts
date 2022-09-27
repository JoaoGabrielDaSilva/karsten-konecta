import styled from "styled-components/native";
import { Address } from "../../components/address/address";
import { ListProduct } from "../../components/list/list-product/list-product";
import { ListProductLoader } from "../../components/list/list-product/loader/list-product-loader";
import { ListRow } from "../../components/list/list-row/list-row";
import { ListRowLoader } from "../../components/list/list-row/loader/list-row-loader";
import { Skeleton } from "../../components/skeleton/skeleton";
import { SectionTitle } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledSectionTitleLoader = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledListRow = styled(ListRow)`
  padding: ${({ theme }) => theme.spacing.xxl}px 0px;
`;

export const StyledListRowLoader = styled(ListRowLoader)`
  padding: ${({ theme }) => theme.spacing.xxl}px 0px;
`;

export const StyledAddress = styled(Address)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledListProduct = styled(ListProduct)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledListProductLoader = styled(ListProductLoader)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;
