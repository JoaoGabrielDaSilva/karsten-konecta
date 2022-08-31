import styled from "styled-components/native";
import { TextInput } from "../../components/form/text-input/text-input";
import { AttendanceListProduct } from "../../components/list/attendance-list-product/attendance-list-product";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const CustomTextInput = styled(TextInput)`
  margin: ${({ theme }) => theme.spacing.xxl}px 0px;
`;

export const ListProduct = styled(AttendanceListProduct)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;
