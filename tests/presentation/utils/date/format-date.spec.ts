import { faker } from "@faker-js/faker";
import { addYears, subYears, getDay, getDate } from "date-fns";
import { formatDate } from "../../../../src/presentation/utils/date/format-date";

describe("FormatDate", () => {
  it("should format date to dd/MM/yyyy", () => {
    const randomDate = faker.date.between(
      subYears(new Date(), 2000),
      addYears(new Date(), 2000)
    );

    const formattedDate = formatDate({ date: randomDate });

    const day = String(getDate(randomDate)).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const year = String(randomDate.getFullYear()).padStart(4, "0");

    expect(formattedDate).toBe(`${day}/${month}/${year}`);
  });
});
