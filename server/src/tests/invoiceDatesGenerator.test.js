const {
  generateDates,
  getDaily,
  getWeekly,
  getMonthly,
} = require("../invoiceDatesGenerator");

describe("generateDates", () => {
  it("should generate daily invoices", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-02-09");
    const result = generateDates(startDate, endDate, "day");

    expect(result).toContain("06/02/2018");
    expect(result).toContain("07/02/2018");
    expect(result).toContain("08/02/2018");
    expect(result).toContain("09/02/2018");
  });

  it("should generate weekly invoices", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-02-27");
    const result = generateDates(startDate, endDate, "week");

    expect(result).toContain("06/02/2018");
    expect(result).toContain("13/02/2018");
    expect(result).toContain("20/02/2018");
    expect(result).toContain("27/02/2018");
  });

  it("should generate monthly invoices", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-04-06");
    const result = generateDates(startDate, endDate, "month");

    expect(result).toContain("06/02/2018");
    expect(result).toContain("06/03/2018");
    expect(result).toContain("06/04/2018");
  });
});

describe("getDaily", () => {
  it("should generate daily invoices", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-02-09");
    const result = getDaily(startDate, endDate);

    expect(result).toContain("06/02/2018");
    expect(result).toContain("07/02/2018");
    expect(result).toContain("08/02/2018");
    expect(result).toContain("09/02/2018");
  });
});

describe("getWeekly", () => {
  it("should generate weekly invoices given a week day", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-02-27");
    const result = getWeekly("tuesday", startDate, endDate);

    expect(result).toContain("06/02/2018");
    expect(result).toContain("13/02/2018");
    expect(result).toContain("20/02/2018");
    expect(result).toContain("27/02/2018");
  });

  it("should generate weekly invoices given a week day that falls on a date less than the start date", () => {
    const startDate = new Date("2020-08-12");
    const endDate = new Date("2020-08-31");
    const result = getWeekly("tuesday", startDate, endDate);

    expect(result).toContain("18/08/2020");
    expect(result).toContain("25/08/2020");
  });
});

describe("getMonthly", () => {
  it("should generate monthly invoices given a month date", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-04-06");
    const result = getMonthly(6, startDate, endDate);

    expect(result).toContain("06/02/2018");
    expect(result).toContain("06/03/2018");
    expect(result).toContain("06/04/2018");
  });

  it("should generate monthly invoices given a month date that falls on a date less than the start date", () => {
    const startDate = new Date("2018-02-06");
    const endDate = new Date("2018-04-06");
    const result = getMonthly(1, startDate, endDate);

    expect(result).toContain("01/03/2018");
    expect(result).toContain("01/04/2018");
  });
});
