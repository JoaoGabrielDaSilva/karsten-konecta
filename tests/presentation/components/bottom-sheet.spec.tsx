import { faker } from "@faker-js/faker";
import {
  act,
  fireEvent,
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import { createRef, ReactElement, RefObject, useRef } from "react";
import { Text } from "react-native";
import {
  BottomSheet,
  BottomSheetProps,
  BottomSheetRef,
} from "../../../src/presentation/components/bottom-sheet/bottom-sheet";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  children: string;
  ref: RefObject<BottomSheetRef>;
  onClose: () => void;
};

const makeSut = (props?: Partial<BottomSheetProps>): SutTypes => {
  const children = faker.random.words();
  const onClose = jest.fn();
  const ref = renderHook(() =>
    useRef<BottomSheetRef>({ open: jest.fn(), close: jest.fn() })
  );

  const sut = renderWithProviders({
    Screen: () => (
      <BottomSheet
        ref={ref.result.current}
        onClose={onClose}
        snapPoints={["100%"]}
        {...props}
      >
        <Text>{children}</Text>
      </BottomSheet>
    ),
  });

  return {
    sut,
    ref: ref.result.current,
    children,
    onClose,
  };
};

describe("BottomSheet", () => {
  it("should open when open function is called", async () => {
    const id = faker.random.numeric(4);
    const { sut, ref } = makeSut({ testID: id });

    expect(sut.getByTestId(id)._fiber.pendingProps.visible).toBe(false);

    await waitFor(() => {
      ref.current.open();
    });

    const modal = await sut.findByTestId(id);
    expect(modal.props.visible).toBe(true);
  }),
    it("should close when overlay is clicked", async () => {
      const id = faker.random.numeric();
      const { sut, ref, children, onClose } = makeSut({ testID: id });

      await waitFor(async () => {
        ref.current.open();
        fireEvent.press(await sut.findByTestId(`${id}-overlay`));
      });

      expect(onClose).toHaveBeenCalledTimes(1);
      sut.getByText(children);
    });
});
