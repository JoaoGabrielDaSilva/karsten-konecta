import { faker } from "@faker-js/faker";
import { addYears, subYears } from "date-fns";
import { formatFullDate } from "../../../../src/presentation/utils/date/format-full-date";

describe("FormatFullDate", () => {
  it("should format date to dd/MM/yyyy às HH:mm", () => {
    const randomDate = faker.date.between(
      subYears(new Date(), 2000),
      addYears(new Date(), 2000)
    );

    const formattedDate = formatFullDate({ date: randomDate });

    const day = String(randomDate.getDate()).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const year = String(randomDate.getFullYear());
    const hours = String(randomDate.getHours()).padStart(2, "0");
    const minutes = String(randomDate.getMinutes()).padStart(2, "0");

    expect(formattedDate).toBe(
      `${day}/${month}/${year} às ${hours}:${minutes}`
    );
  });
});
