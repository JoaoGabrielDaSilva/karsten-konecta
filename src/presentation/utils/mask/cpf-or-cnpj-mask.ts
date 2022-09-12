import { cnpjMask } from "./cnpj-mask";
import { cpfMask } from "./cpf-mask";

export const CpfOrCnpjMask = (value: string) =>
  value?.length > 14 ? cnpjMask(value) : cpfMask(value);
