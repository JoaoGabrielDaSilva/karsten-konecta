import { MaterialCommunityIcons } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { DrawerActions } from "@react-navigation/native";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import { Control, useForm } from "react-hook-form";
import {
  StackNavbar,
  StackNavbarProps,
} from "../../../../src/presentation/components/navigation/stack-navbar/stack-navbar";

import { renderWithProviders } from "../../__mocks__/app.provider";
import { mockNavigationProps } from "../../__mocks__/navigation-prop";

const mockedOpenDrawer = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
  };
});

type SutTypes = {
  sut: RenderResult;
  data: Partial<StackNavbarProps>;
};

type SutParams = Partial<StackNavbarProps>;

const mockProps = (): StackNavbarProps => ({
  navigation: mockNavigationProps().navigation,
  options: {
    title: faker.random.word(),
  },
});

const makeSut = (props?: SutParams): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <StackNavbar {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("StackNavbar", () => {
  afterEach(() => mockedOpenDrawer.mockClear());

  it("should toggle drawer", async () => {
    const { sut, data } = makeSut({
      drawer: true,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: "menu",
      })
    );

    expect(data.navigation.dispatch).toHaveBeenCalledTimes(1);
    expect(data.navigation.dispatch).toHaveBeenCalledWith(
      DrawerActions.openDrawer
    );
  });
  it("should show title", async () => {
    const title = faker.random.word();

    const { sut } = makeSut({
      options: {
        title,
      },
    });

    sut.getByText(title);
  });
  it("should show right icon", async () => {
    const rightIcon: keyof typeof MaterialCommunityIcons.glyphMap = "file";

    const onRightIconPress = jest.fn();

    const { sut } = makeSut({
      rightIcon,
      onRightIconPress,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: rightIcon,
      })
    );

    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });
  it("should left icon", async () => {
    const onLeftIconPress = jest.fn();
    const headerLeftIcon: keyof typeof MaterialCommunityIcons.glyphMap = "file";

    const { sut } = makeSut({
      headerLeftIcon,
      onLeftIconPress,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: headerLeftIcon,
      })
    );
    expect(onLeftIconPress).toHaveBeenCalledTimes(1);
  });
  it("should show back arrow", async () => {
    const goBack = jest.fn();

    const { sut } = makeSut({
      navigation: {
        ...mockNavigationProps().navigation,
        goBack,
        canGoBack: () => true,
      },
      backArrow: true,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: "chevron-left",
      })
    );
    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
