import { validateCpf } from "../../../../src/presentation/utils/validation/validate-cpf";

describe("Validate CPF", () => {
  it("should return true if cpf is valid", () => {
    const validCpf = "03284738045";

    expect(validateCpf(validCpf)).toBe(true);
  });
  it("should return false if cpf is invalid", () => {
    const invalidCpf = "12345678910";

    expect(validateCpf(String(invalidCpf))).toBe(false);
  });
  it("should return false if cpf is empty", () => {
    expect(validateCpf(String(""))).toBe(false);
  });
});
