import { Route } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../src/presentation/routes";

export function mockNavigationProps<
  Route extends keyof RootPrivateStackParamList
>(
  routeName: keyof RootPrivateStackParamList,
  params?: StackScreenProps<RootPrivateStackParamList, Route, undefined>
): StackScreenProps<RootPrivateStackParamList, Route, undefined> {
  return {
    route: {
      name: routeName,
      key: "",
      params,
      path: "",
    },
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
