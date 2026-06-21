export function parseDateRange(startDate, endDate) {
  const start = startDate ? new Date(`${startDate}T00:00:00.000Z`) : new Date();
  const end = endDate ? new Date(`${endDate}T00:00:00.000Z`) : addDays(start, 4);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    const error = new Error("Start date and end date must be valid ISO dates.");
    error.status = 422;
    throw error;
  }

  if (start > end) {
    const error = new Error("Start date must be before or equal to end date.");
    error.status = 422;
    throw error;
  }

  const diffDays = Math.ceil((end - start) / 86400000) + 1;
  if (diffDays > 16) {
    const error = new Error("Date range cannot exceed 16 days for this real-time weather API.");
    error.status = 422;
    throw error;
  }

  return { start, end, startISO: toDateOnly(start), endISO: toDateOnly(end) };
}

export function toDateOnly(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}
