import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import { listWeatherRequests } from "../services/requestService.js";
import { flattenRequest, toMarkdown } from "../utils/formatters.js";

export async function exportData(req, res, next) {
  try {
    const records = await listWeatherRequests();
    const format = String(req.params.format).toLowerCase();

    if (format === "json") {
      res.setHeader("Content-Disposition", "attachment; filename=weather-requests.json");
      return res.json(records);
    }

    if (format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(records.map(flattenRequest));
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=weather-requests.csv");
      return res.send(csv);
    }

    if (format === "markdown" || format === "md") {
      res.setHeader("Content-Type", "text/markdown");
      res.setHeader("Content-Disposition", "attachment; filename=weather-requests.md");
      return res.send(toMarkdown(records));
    }

    if (format === "pdf") {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=weather-requests.pdf");
      const doc = new PDFDocument({ margin: 44 });
      doc.pipe(res);
      doc.fontSize(18).text("Weather Request Export", { underline: true });
      doc.moveDown();
      records.map(flattenRequest).forEach((row) => {
        doc.fontSize(11).text(`#${row.id} ${row.location}`);
        doc.fontSize(9).text(`Query: ${row.query}`);
        doc.text(`Date range: ${new Date(row.startDate).toISOString().slice(0, 10)} to ${new Date(row.endDate).toISOString().slice(0, 10)}`);
        doc.text(`Temperature: ${row.temperature ?? "N/A"} C | Wind: ${row.windSpeed ?? "N/A"} km/h`);
        doc.moveDown(0.7);
      });
      return doc.end();
    }

    const error = new Error("Unsupported export format. Use json, csv, pdf, or markdown.");
    error.status = 400;
    throw error;
  } catch (error) {
    next(error);
  }
}
