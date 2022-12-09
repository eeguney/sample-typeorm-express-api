import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "typeormtest",
    entities: ["src/entity/*.ts"],
    logging: false,
    synchronize: true,
});

export default myDataSource;