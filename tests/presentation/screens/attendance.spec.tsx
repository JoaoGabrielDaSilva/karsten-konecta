import { faker } from "@faker-js/faker";
import {
  fireEvent,
  RenderResult,
  act,
  waitFor,
} from "@testing-library/react-native";

import { renderWithProviders } from "../__mocks__/app.provider";
import { mockNavigationProps } from "../__mocks__/navigation-prop";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootPrivateStackParamList } from "../../../src/presentation/routes";
import { GetAttendanceSpy } from "../../domain/mocks/mock-get-attendance";
import { RouteProp } from "@react-navigation/native";
import { useUserStore } from "../../../src/presentation/store/user";
import { mockStore } from "../__mocks__/store/mock-user-store";
import { useCustomerStore } from "../../../src/presentation/store/customer";
import {
  GetCustomerSpy,
  mockGetCustomerModel,
} from "../../domain/mocks/customer/mock-get-customer";
import { useAttendanceStore } from "../../../src/presentation/store/attendance";
import { Attendance } from "../../../src/presentation/screens/attendance/attendance";
import { CreateAttendanceSpy } from "../../domain/mocks/mock-create-attendance";
import { RetrieveAttendanceSpy } from "../../domain/mocks/attendance/mock-retrieve-attendance";
import { cpfMask } from "../../../src/presentation/utils/mask/cpf-mask";
import { GetShippingInfoSpy } from "../../domain/mocks/shipping/mock-get-shipping-info";

type SutTypes = {
  sut: RenderResult;
  navigation: StackNavigationProp<RootPrivateStackParamList, "Attendance">;
  getAttendanceSpy: GetAttendanceSpy;
  createAttendanceSpy: CreateAttendanceSpy;
  retrieveAttendanceSpy: RetrieveAttendanceSpy;
  getCustomerSpy: GetCustomerSpy;
  getShippingInfoSpy: GetShippingInfoSpy;
};

type SutParams = {
  params?: {
    cpfCnpj?: string;
    id?: string;
    name?: string;
  };
};

const makeSut = ({ params }: SutParams): SutTypes => {
  const mockedNavigation = mockNavigationProps<"Attendance">("Attendance");
  const getAttendanceSpy = new GetAttendanceSpy();
  const createAttendanceSpy = new CreateAttendanceSpy();
  const retrieveAttendanceSpy = new RetrieveAttendanceSpy();
  const getCustomerSpy = new GetCustomerSpy();
  const getShippingInfoSpy = new GetShippingInfoSpy();

  const sut = renderWithProviders({
    Screen: () =>
      Attendance({
        navigation: mockedNavigation.navigation,
        route: {
          params,
        },
        getAttendance: getAttendanceSpy,
        createAttendance: createAttendanceSpy,
        retrieveAttendance: retrieveAttendanceSpy,
        getCustomer: getCustomerSpy,
        getShippingInfo: getShippingInfoSpy,
      }),
  });

  return {
    sut,
    navigation: mockedNavigation.navigation,
    getAttendanceSpy,
    createAttendanceSpy,
    retrieveAttendanceSpy,
    getCustomerSpy,
    getShippingInfoSpy,
  };
};

describe("Attendance", () => {
  it("should create a new attendance with no customer", async () => {
    const attendanceName = faker.name.firstName();
    const mockedStore = mockStore();
    await waitFor(() => {
      useUserStore.setState({ store: mockedStore });
      useCustomerStore.setState({
        data: undefined,
        setCustomer: jest.fn(),
        clearCustomer: jest.fn(),
      });
    });
    const { sut, createAttendanceSpy, getAttendanceSpy } = makeSut({
      params: {
        name: attendanceName,
      },
    });
    await act(() => expect(createAttendanceSpy.callsCount).toBe(1));
    expect(createAttendanceSpy.params).toEqual({
      name: attendanceName,
      cpfCnpj: undefined,
      customerId: undefined,
      storeId: mockedStore.id,
    });
    expect(getAttendanceSpy.callsCount).toBe(1);
    expect(getAttendanceSpy.params).toEqual({
      id: createAttendanceSpy.data.id,
      storeId: mockedStore.id,
    });
    const attendanceStore = useAttendanceStore.getState();
    expect(attendanceStore.name).toBe(getAttendanceSpy.data.name);
    expect(attendanceStore.id).toBe(createAttendanceSpy.data.id);
    sut.getByText(getAttendanceSpy.data.name);
    sut.getByText(/finalizar cadastro/i);
  });
  // it("should retrieve customer existant attendance", async () => {
  //   const attendanceName = faker.name.firstName();
  //   const mockedStore = mockStore();
  //   const cpfCnpj = faker.random.numeric(11);
  //   await waitFor(() => {
  //     useUserStore.setState({ store: mockedStore });
  //     useCustomerStore.setState({
  //       data: undefined,
  //     });
  //   });
  //   const { sut, getCustomerSpy, retrieveAttendanceSpy, getAttendanceSpy } =
  //     makeSut({
  //       params: {
  //         name: attendanceName,
  //         cpfCnpj,
  //       },
  //     });

  //   await waitFor(async () => {
  //     expect(getCustomerSpy.callsCount).toBe(1);
  //     expect(getCustomerSpy.params).toEqual({
  //       storeId: mockedStore.id,
  //       cpfCnpj: cpfCnpj,
  //     });
  //   });

  //   await waitFor(async () => {
  //     expect(retrieveAttendanceSpy.callsCount).toBe(1);
  //     expect(retrieveAttendanceSpy.params).toEqual({
  //       cpfCnpj: getCustomerSpy.data.cpfCnpj,
  //       customerId: getCustomerSpy.data.id,
  //       storeId: mockedStore.id,
  //     });
  //   });
  //   await waitFor(async () => {
  //     expect(getAttendanceSpy.callsCount).toBe(1);
  //     expect(getAttendanceSpy.params).toEqual({
  //       id: retrieveAttendanceSpy.data.id,
  //       storeId: mockedStore.id,
  //     });
  //   });
  //   // await sut.findByText(getAttendanceSpy.data.name);
  //   // await sut.findByText(cpfMask(getCustomerSpy.data.cpfCnpj));
  //   // await sut.findByText(/editar/i);
  // });
});
