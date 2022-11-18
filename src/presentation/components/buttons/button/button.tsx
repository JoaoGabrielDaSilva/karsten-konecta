import React from "react";

import { Button as BaseButton, IButtonProps, Text, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";

export type ButtonProps = {
  loading?: boolean;
  icon?: keyof typeof Feather.glyphMap;
} & IButtonProps;

export const Button = ({
  loading,
  children,
  onPress,
  disabled,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      isLoading={loading}
      rightIcon={icon ? <Icon name={icon} as={Feather} /> : null}
      onPress={onPress}
      disabled={disabled || loading}
      _pressed={{
        opacity: 0.8,
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};
