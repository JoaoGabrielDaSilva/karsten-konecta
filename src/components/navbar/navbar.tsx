import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Container, BackIcon } from "./styles";

export const Navbar = () => {
  const { goBack } = useNavigation();

  return (
    <Container>
      <BorderlessButton onPress={goBack}>
        <BackIcon name="arrow-back-ios" />
      </BorderlessButton>
    </Container>
  );
};
