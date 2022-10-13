import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { makeCpfCnpjRule } from "../../../../src/presentation/utils/yup-schemas/cpf-cnpj-rule";

type SutTypes = {
  sut: typeof makeCpfCnpjRule;
};

const makeSut = (): SutTypes => {
  const sut = makeCpfCnpjRule;

  return {
    sut,
  };
};

describe("yup cpf/cnpj rule", () => {
  it("should validate cpf if value is <= 11", async () => {
    const validCpf = "032.847.380-45";

    const { sut } = makeSut();

    expect(await sut().validate(validCpf)).toBeTruthy();
  });
  it("should throw invalid cpf error when cpf is invalid and value <= 11", async () => {
    const { sut } = makeSut();

    const promise = sut().validate("123.456.789-10");

    expect(promise).rejects.toThrow(
      new ValidationError("Digite um CPF válido")
    );
  });
  it("should validate cnpj if value is >= 11", async () => {
    const validCnpj = "60.906.245/0001-04";

    const { sut } = makeSut();

    expect(await sut().validate(validCnpj)).toBeTruthy();
  });
  it("should throw invalid cnpj error when cnpj is invalid and value <= 11", async () => {
    const { sut } = makeSut();

    const promise = sut().validate("12.345.678/9101-11");

    expect(promise).rejects.toThrow(
      new ValidationError("Digite um CNPJ válido")
    );
  });
});
