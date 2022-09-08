import styled from "styled-components/native";
import { Skeleton } from "../../../skeleton/skeleton";

export const Button = styled(Skeleton)``;

export const Amount = styled(Skeleton)`
  margin: 0px ${({ theme }) => theme.spacing.md}px;
`;
