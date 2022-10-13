import { faker } from "@faker-js/faker";
import { validateCep } from "../../../../src/presentation/utils/validation/validate-cep";

describe("Validate CEP", () => {
  it("should return true if cep is valid", () => {
    const randomCep = faker.random.numeric(8);

    expect(validateCep(randomCep)).toBe(true);
  });
  it("should return false if cep is invalid", () => {
    const randomCep = Math.floor(Math.random() * 7) + 1;

    expect(validateCep(String(randomCep))).toBe(false);
  });
  it("should return false if cep is empty", () => {
    expect(validateCep(String(""))).toBe(false);
  });
});
