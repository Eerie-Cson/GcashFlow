import "reflect-metadata";
import { App } from "./app";
import { container } from "tsyringe";
import { Database } from "./libs/database/db";
import { TransactionFactory } from "./services/repository/transaction.repository";
import { Token } from "./services/lib/token";
async function bootstrap() {
  const db = container.resolve(Database);
  await db.connect();

  container.register(Token.TransactionRepository, {
    useFactory: () => {
      const connection = db.getConnection();
      return TransactionFactory(connection);
    },
  });

  const server = container.resolve(App);
  await server.start();
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
