export function insertDocument(collection, document callback) {
  collection.insertOne(document, callback);
}
