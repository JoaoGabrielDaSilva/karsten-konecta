import { format, isValid, subMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";

type FormatDateParams = {
  date: Date;
};

export const formatFullDate = ({ date }: FormatDateParams): string => {
  if (!isValid(date)) return "-";

  const formattedDate = format(date, "dd/MM/yyy 'às' HH:mm", {
    locale: ptBR,
  });

  return formattedDate;
};
