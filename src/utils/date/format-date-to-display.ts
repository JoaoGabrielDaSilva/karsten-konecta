import { isValid, format, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

type FormatDateParams = {
  date: Date | string;
};

export const formatDateToDisplay = ({ date }: FormatDateParams) => {
  const cleanDate = new Date(date);
  if (!isValid(cleanDate)) return "-";

  let formatString = "";

  if (isToday(cleanDate)) {
  }

  switch (true) {
    case isToday(cleanDate):
      formatString = "'Today'";
      break;
    case isYesterday(cleanDate):
      formatString = "'Yesterday'";
      break;
    default:
      formatString = "MMMM dd";
  }

  return format(cleanDate, formatString, { locale: enUS });
};
