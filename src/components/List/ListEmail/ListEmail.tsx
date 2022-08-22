import React from "react";
import { View } from "react-native";

import styles from "./styles";

export type ListEmailData = {};

type Props = ListEmailData;

export const ListEmail = ({}: ListEmailData) => {
  return <View style={styles.container}></View>;
};
