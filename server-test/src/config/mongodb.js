import { MongoClient } from "mongodb";
import { env } from "../config/environment";

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true, // sử dụng engine quản lý kết nối mới từ Mongodb driver
    useNewUrlParser: true, //dịch code
  });

  //connecting client to server
  await client.connect();

  //assign database for client
  dbInstance = client.db(env.DATABASE_NAME);
};


export const getDB = () => {
  if (!dbInstance) throw new Error("Where is your db ??? bozo");
  return dbInstance;
};

