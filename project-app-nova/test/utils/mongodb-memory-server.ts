import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';

let mongod: MongoMemoryServer;

export const startMongo = async (): Promise<string> => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  return uri;
};

export const stopMongo = async () => {
  if (mongod) {
    await mongod.stop();
  }
};

export const clearCollections = async (connection: Connection) => {
  if (connection && connection.readyState === 1) {
    const collections = connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
