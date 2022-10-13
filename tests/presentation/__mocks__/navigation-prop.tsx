import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../src/presentation/routes";

export function mockNavigationProps<
  Route extends keyof RootPrivateStackParamList
>(
  name: keyof RootPrivateStackParamList,
  params?: Pick<RouteProp<RootPrivateStackParamList, Route>, "params">
): StackScreenProps<RootPrivateStackParamList, Route> {
  return {
    route: {
      name,
      key: "",
      params,
      path: "",
    } as any,
    navigation: {
      addListener: jest.fn(),
      setParams: jest.fn(),
      canGoBack: jest.fn(),
      dispatch: jest.fn(),
      getId: jest.fn(),
      getParent: jest.fn(),
      getState: jest.fn(),
      isFocused: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      push: jest.fn(),
      removeListener: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
    },
  };
}
