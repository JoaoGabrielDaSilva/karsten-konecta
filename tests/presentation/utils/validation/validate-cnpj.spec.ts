import { validateCnpj } from "../../../../src/presentation/utils/validation/validate-cnpj";

describe("Validate CNPJ", () => {
  it("should return true if cnpf is valid", () => {
    const validCnpj = "60906245000104";

    expect(validateCnpj(validCnpj)).toBe(true);
  });
  it("should return false if cnpf is invalid", () => {
    const invalidCnpj = "12345678910111";

    expect(validateCnpj(String(invalidCnpj))).toBe(false);
  });
  it("should return false if cnpf is empty", () => {
    expect(validateCnpj(String(""))).toBe(false);
  });
});
