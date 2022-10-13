import { faker } from "@faker-js/faker";
import { cpfMask } from "../../../../src/presentation/utils/mask/cpf-mask";
import { cnpjMask } from "../../../../src/presentation/utils/mask/cnpj-mask";
import { CpfOrCnpjMask } from "../../../../src/presentation/utils/mask/cpf-or-cnpj-mask";

jest.mock("../../../../src/presentation/utils/mask/cpf-mask");
jest.mock("../../../../src/presentation/utils/mask/cnpj-mask");

describe("Cpf or Cnpj Mask", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should format number to xxx.xxx.xxx-xx if length is <= 11", () => {
    const randomNumber = faker.random.numeric(14);

    CpfOrCnpjMask(randomNumber);

    expect(cpfMask).toHaveBeenCalledTimes(1);
    expect(cpfMask).toHaveBeenCalledWith(randomNumber);

    expect(cnpjMask).toHaveBeenCalledTimes(0);
  });
  it("should format number to xx.xxx.xxx/xxxx-xx if length is >= 12", () => {
    const randomNumber = faker.random.numeric(18);

    CpfOrCnpjMask(randomNumber);

    expect(cnpjMask).toHaveBeenCalledTimes(1);
    expect(cnpjMask).toHaveBeenCalledWith(randomNumber);

    expect(cpfMask).toHaveBeenCalledTimes(0);
  });
});
