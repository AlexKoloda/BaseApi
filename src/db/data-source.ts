import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/../**/entity/*.ts`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  subscribers: [],
});

AppDataSource.initialize()

  .then(async () => {
    console.log("Подключено к базе данных");
  })

  .catch((error) => console.log(error));
