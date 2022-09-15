import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useUserStore } from "../../../store/user";
import { ListRow } from "../../list/list-row/list-row";

import { Typography } from "../../utils";

import { Container, Info, ProfilePicture, Email, TopSide } from "./styles";

export const DrawerHeader = () => {
  const { name, email, store } = useUserStore();
  const { navigate } = useNavigation();

  return (
    <Container>
      <TopSide>
        <ProfilePicture
          source={{
            uri: "https://64.media.tumblr.com/c21af471bf381cbf34b02b27d2cff119/038823a2b6ce1c4e-9e/s640x960/9c0002022b39ccbca0046d52a9c7dd4390ff487f.jpg",
          }}
        />
        <View>
          <Info>
            <Typography bold variant="heading">
              {name}
            </Typography>
            <Email>{email}</Email>
          </Info>
        </View>
      </TopSide>
      <ListRow
        onPress={() => navigate("StoreSelect")}
        label={store?.name}
        rightIconFamily="feather"
        leftIcon="business"
        rightIcon="chevron-right"
        borderless
        numberOfLines={1}
      />
    </Container>
  );
};
