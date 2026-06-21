import { fileCreate, fileDelete, fileFindMany, fileFindUnique, fileUpdate } from "./fileStore.js";

export function createRecord(data) {
  return fileCreate(data);
}

export function findManyRecords() {
  return fileFindMany();
}

export function findUniqueRecord(id) {
  return fileFindUnique(id);
}

export function updateRecord(id, data) {
  return fileUpdate(id, data);
}

export function deleteRecord(id) {
  return fileDelete(id);
}
