import PDFDocument from "pdfkit";

export const generatePDF = async (data, title = "Report") => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

      doc.fontSize(18).text(title, { align: "center" });
      doc.moveDown();

      if (data.length > 0) {
        const headers = Object.keys(data[0]);

        doc.fontSize(12).text(headers.join(" | "), { underline: true });
        doc.moveDown();

        data.forEach((row) => {
          const rowText = headers.map((key) => row[key]).join(" | ");
          doc.text(rowText);
        });
      } else {
        doc.text("No data available.");
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
