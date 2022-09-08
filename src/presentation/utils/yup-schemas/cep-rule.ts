import * as yup from "yup";
import { validateCep } from "../validation/validate-cep";

export const makeCepRule = () =>
  yup
    .string()
    .required("O CEP deve ser informado")
    .test("cepRule", "Digite um CEP válido!", validateCep);
