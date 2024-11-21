import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/../entity/*.{ts,js}`],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
    subscribers: [],
})