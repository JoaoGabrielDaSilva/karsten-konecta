import { format, isValid, subMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";

type FormatDateParams = {
  date: Date;
};

export const formatDate = ({ date }: FormatDateParams): string => {
  if (!isValid(date)) return "-";

  const formattedDate = format(date, "dd/MM/yyyy", {
    locale: ptBR,
  });

  return formattedDate;
};
