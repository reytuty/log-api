import "reflect-metadata"
import { DataSource } from "typeorm"
import { Log } from "./entity/Log"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Log],
    migrations: [],
    subscribers: [],
})
