import * as yup from "yup";
import { makeCpfCnpjRule } from "../../utils/yup-schemas/cpf-cnpj-rule";

export const customerSearchSchema = yup.object().shape({
  cpfCnpj: makeCpfCnpjRule(),
});
