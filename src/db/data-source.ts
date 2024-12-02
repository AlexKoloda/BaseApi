import "reflect-metadata";
import { DataSource } from "typeorm";
import conf from '../config';


export const AppDataSource = new DataSource({
  type: "postgres",
  host: conf.database.host,
  port: Number(conf.database.port),
  username: conf.database.userName,
  password: conf.database.password,
  database: conf.database.dbName,
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
