import * as yup from "yup";
import { makeCepRule } from "../../utils/yup-schemas/cep-rule";

export const addressRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .required("O nome deve ser informado"),
  cep: makeCepRule(),
  street: yup
    .string()
    .required("O logradouro deve ser informado")
    .min(5, "O logradouro deve conter pelo menos 5 caracteres"),
  number: yup
    .string()
    .required("O número deve ser informado")
    .min(2, "O número deve conter pelo menos 2 caracteres"),
  district: yup
    .string()
    .required("O bairro deve ser informado")
    .min(4, "O bairro deve conter pelo menos 4 caracteres"),
  city: yup
    .string()
    .required("A cidade deve ser informado")
    .min(4, "A cidade deve conter pelo menos 4 caracteres"),
  state: yup.string().required("O estado deve ser informado"),
});
