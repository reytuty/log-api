import "reflect-metadata"
import { DataSource } from "typeorm"
import { Log } from "./entity/Log"
import { LogAudits } from "./entity/LogAudits"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Log, LogAudits],
    migrations: [],
    subscribers: [],
})
