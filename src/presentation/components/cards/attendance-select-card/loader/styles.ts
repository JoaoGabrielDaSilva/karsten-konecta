import styled from "styled-components/native";
import { ListProductLoader } from "../../../list/list-product/loader/list-product-loader";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Name = styled(Skeleton)``;

export const Value = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const RadioButton = styled(Skeleton)``;

export const StyledListProductLoader = styled(ListProductLoader)`
  max-width: 90%;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;
