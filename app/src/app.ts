import { injectable } from "tsyringe";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import createTransactionRouter from "./router/transaction-router";

@injectable()
export class App {
  private app: Application;
  private readonly port: number;
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3001");
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public async start() {
    try {
      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: "http://localhost:3001",
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(helmet());
  }

  private initializeRoutes(): void {
    console.log("Routes initialized");
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.use("/api/transactions", createTransactionRouter());
  }
}
