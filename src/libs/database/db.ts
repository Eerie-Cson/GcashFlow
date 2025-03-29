import { injectable, singleton } from "tsyringe";
import mongoose, { Connection } from "mongoose";

@injectable()
@singleton()
export class Database {
  private connectionString: string;
  private connection: Connection;

  constructor() {
    this.connectionString =
      process.env.MONGODB_URI || "mongodb://localhost:27017/transactions";
    this.connection = mongoose.createConnection(this.connectionString);
  }

  public getConnection(): Connection {
    return this.connection;
  }

  public async connect(): Promise<void> {
    try {
      await this.connection.asPromise();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.connection.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}
