import * as yup from "yup";
import { validateCnpj } from "../validation/validate-cnpj";
import { validateCpf } from "../validation/validate-cpf";

export const makeCpfCnpjRule = () =>
  yup
    .string()

    .test("cpf-rule", "Digite um CPF válido", (value) =>
      value && value?.length <= 14 ? validateCpf(value) : true
    )
    .test("cnpj-rule", "Digite um CNPJ válido", (value) =>
      value && value.length > 14 ? validateCnpj(value) : true
    );
