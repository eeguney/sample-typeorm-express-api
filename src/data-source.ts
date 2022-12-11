import { DataSource } from "typeorm"
import CONFIG from "./config";

const myDataSource = new DataSource({
    type: "mysql",
    host: CONFIG.DS_HOST,
    port: Number(CONFIG.DS_PORT),
    username: CONFIG.DS_USERNAME,
    password: CONFIG.DS_PASSWORD,
    database: CONFIG.DS_DATABASE,
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
});

export default myDataSource;