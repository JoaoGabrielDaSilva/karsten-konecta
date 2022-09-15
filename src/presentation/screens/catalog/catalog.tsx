import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BottomTab } from "../../components/navigation/bottom-tab/bottom-tab";
import { StackSearchNavbar } from "../../components/navigation/search-navbar/search-navbar";
import { RootPrivateStackParamList } from "../../routes";
import { Container } from "./styles";

type Props = StackScreenProps<RootPrivateStackParamList, "Catalog">;

export const Catalog = ({ navigation: { setOptions, push } }: Props) => {
  const { control } = useForm<{ search: string }>();

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackSearchNavbar
          {...props}
          control={control}
          backArrow={false}
          onFocus={() => push("ProductList", { defaultFocus: true })}
          drawer
        />
      ),
    });
  }, []);

  return (
    <Container>
      <BottomTab />
    </Container>
  );
};
