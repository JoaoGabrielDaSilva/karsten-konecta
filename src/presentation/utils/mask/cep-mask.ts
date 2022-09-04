export function cepMask(cep: string) {
  if (!cep) return "";

  return cep
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
}
