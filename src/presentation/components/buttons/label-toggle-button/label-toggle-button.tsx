import React, { useState } from "react";
import { Button, Container, Label } from "./styles";

export enum Direction {
  LEFT,
  RIGHT,
}

type Props = {
  leftLabel: string;
  rightLabel: string;
  onSelect: (direction: Direction) => void | Promise<void>;
  defaultValue: Direction;
};

export const LabelToggleButton = ({
  leftLabel,
  rightLabel,
  onSelect,
  defaultValue,
}: Props) => {
  const [selectedSide, setSelectedSide] = useState(defaultValue);

  const isLeftActive = selectedSide === Direction.LEFT;

  const handlePress = async (direction: Direction) => {
    onSelect && (await onSelect(direction));
    setSelectedSide(direction);
  };

  return (
    <Container>
      <Button
        active={isLeftActive}
        leftSide={true}
        onPress={() => handlePress(Direction.LEFT)}
      >
        <Label bold={isLeftActive} active={isLeftActive}>
          {leftLabel}
        </Label>
      </Button>
      <Button
        active={!isLeftActive}
        leftSide={false}
        onPress={() => handlePress(Direction.RIGHT)}
      >
        <Label bold={!isLeftActive} active={!isLeftActive}>
          {rightLabel}
        </Label>
      </Button>
    </Container>
  );
};
