import { faker } from "@faker-js/faker";
import { phoneMask } from "../../../../src/presentation/utils/mask/phone-mask";

describe("CepMask", () => {
  it("should format number to (xx) xxxx-xxxx", () => {
    const randomNumber = faker.random.numeric(10);

    const formattedNumber = phoneMask(randomNumber);

    expect(formattedNumber).toBe(
      `(${randomNumber.slice(0, 2)}) ${randomNumber.slice(
        2,
        6
      )}-${randomNumber.slice(6, 10)}`
    );
  });
  it("should format number to (xx) xxxxx-xxxx", () => {
    const randomNumber = faker.random.numeric(11);

    const formattedNumber = phoneMask(randomNumber);

    expect(formattedNumber).toBe(
      `(${randomNumber.slice(0, 2)}) ${randomNumber.slice(
        2,
        7
      )}-${randomNumber.slice(7, 11)}`
    );
  });
});
