import React from "react";

import {
  Center,
  Container,
  HeaderIcon,
  HeaderLeft,
  HeaderRight,
} from "./styles";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "../../form/text-input/text-input";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { RootPrivateStackParamList } from "../../../routes";
import { Typography } from "../../utils";
import { Dimensions } from "react-native";

type NavigationProps = {
  navigation: StackNavigationProp<RootPrivateStackParamList, any>;
};

type IconType = keyof typeof MaterialIcons.glyphMap;

type Props = NavigationProps & {
  control: Control<any, any>;
  handleSubmit: () => void;
};

const { width } = Dimensions.get("window");

export const SearchNavbar = ({ navigation, control, handleSubmit }: Props) => {
  const { canGoBack, goBack } = navigation;

  return (
    <Container align="center">
      <HeaderLeft>
        {(true || canGoBack()) && (
          <HeaderIcon name="chevron-left" onPress={goBack} />
        )}
      </HeaderLeft>
      <Center>
        <TextInput
          size="small"
          control={control}
          name="search"
          placeholder="Buscar produto..."
          disableFloatingPlaceholder
          onSubmitEditing={handleSubmit}
        />
      </Center>
      <HeaderRight>
        <RectButton>
          <Typography>Cancelar</Typography>
        </RectButton>
      </HeaderRight>
    </Container>
  );
};
