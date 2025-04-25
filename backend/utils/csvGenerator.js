import { createObjectCsvStringifier } from "csv-writer";

export const generateCSV = (data) => {
  if (!data || data.length === 0) {
    return Buffer.from("", "utf-8");
  }

  const headers = Object.keys(data[0]).map((key) => ({ id: key, title: key }));

  const csvStringifier = createObjectCsvStringifier({ header: headers });
  const csvContent =
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

  return Buffer.from("\uFEFF" + csvContent, "utf-8");
};
