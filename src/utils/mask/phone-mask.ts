export function phoneMask(phone: string) {
  if (!phone) return "";

  if (phone.replace(/\D/g, "").length < 10) {
    return phone.replace(/\D/g, "");
  }

  return phone
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .replace(/(-\d{4})\d+?$/, "$1");
}
