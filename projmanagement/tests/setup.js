import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
process.env.ACCESS_TOKEN_EXPIRY = '1h';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.REFRESH_TOKEN_EXPIRY = '10d';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // If a connection already exists, close it
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
