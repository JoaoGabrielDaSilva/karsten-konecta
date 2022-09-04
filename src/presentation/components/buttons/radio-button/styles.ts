import styled from "styled-components/native";

const ITEM_SIZE = 25;

export const Container = styled.View`
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;

  border: 1px solid ${({ theme }) => theme.color.background.emphasis};
  border-radius: ${ITEM_SIZE}px;

  padding: 5px;

  align-items: center;
  justify-content: center;
`;

export const Fill = styled.View`
  width: ${ITEM_SIZE - 10}px;
  height: ${ITEM_SIZE - 10}px;

  background-color: ${({ theme }) => theme.color.background.emphasis};
  border-radius: ${ITEM_SIZE}px;
`;
