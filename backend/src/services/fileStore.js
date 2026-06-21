import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../../data");
const dataFile = path.join(dataDir, "weather-requests.json");

export async function fileCreate(data) {
  const records = await readRecords();
  const now = new Date().toISOString();
  const record = {
    ...data,
    id: nextId(records),
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  await writeRecords(records);
  return record;
}

export async function fileFindMany() {
  const records = await readRecords();
  return records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function fileFindUnique(id) {
  const records = await readRecords();
  return records.find((record) => Number(record.id) === Number(id)) || null;
}

export async function fileUpdate(id, data) {
  const records = await readRecords();
  const index = records.findIndex((record) => Number(record.id) === Number(id));
  if (index === -1) return null;
  records[index] = {
    ...records[index],
    ...data,
    id: records[index].id,
    updatedAt: new Date().toISOString()
  };
  await writeRecords(records);
  return records[index];
}

export async function fileDelete(id) {
  const records = await readRecords();
  const nextRecords = records.filter((record) => Number(record.id) !== Number(id));
  await writeRecords(nextRecords);
}

async function readRecords() {
  try {
    const content = await readFile(dataFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeRecords(records) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(records, null, 2));
}

function nextId(records) {
  return records.reduce((max, record) => Math.max(max, Number(record.id) || 0), 0) + 1;
}
