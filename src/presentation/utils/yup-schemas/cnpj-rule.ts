import * as yup from "yup";
import { validateCnpj } from "../validation/validate-cnpj";

export const makeCnpjRule = () =>
  yup
    .string()
    .required("O CNPJ deve ser informado")
    .test("cpfRule", "Digite um CNPJ válido!", validateCnpj);
