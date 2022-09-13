import React, { useState } from "react";
import { Button, Container, Label } from "./styles";

export enum Direction {
  LEFT,
  RIGHT,
}

type Props = {
  leftLabel: string;
  rightLabel: string;
  onSelect: (direction: Direction) => void;
};

export const LabelToggleButton = ({ leftLabel, rightLabel }: Props) => {
  const [selectedSide, setSelectedSide] = useState(Direction.LEFT);

  const isLeftActive = selectedSide === Direction.LEFT;

  return (
    <Container>
      <Button
        active={isLeftActive}
        leftSide={true}
        onPress={() => setSelectedSide(Direction.LEFT)}
      >
        <Label bold={isLeftActive} active={isLeftActive}>
          {leftLabel}
        </Label>
      </Button>
      <Button
        active={!isLeftActive}
        leftSide={false}
        onPress={() => setSelectedSide(Direction.RIGHT)}
      >
        <Label bold={!isLeftActive} active={!isLeftActive}>
          {rightLabel}
        </Label>
      </Button>
    </Container>
  );
};
