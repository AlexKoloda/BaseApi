import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*.ts`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  subscribers: [],
});

AppDataSource.initialize()

  .then(async () => {
    console.log("Подключено к базе данных");
  })

  .catch((error) => console.log(error));
