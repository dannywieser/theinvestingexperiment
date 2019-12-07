import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://crispy-engine-admin:Lopper1978!@crispyengine-gu3qz.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'TheInvestingExperiment';
const mongoConfig = { useUnifiedTopology: true };
const client = new MongoClient(url, mongoConfig);

export function doAction(collectionName, action) {
  client.connect(function(err) {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log(`connected|db:${dbName}|collection:${collectionName}`);
    action(collection, (err, result) => {
      console.log('complete', result.ops.length);
      client.close();
    });
  });
}
