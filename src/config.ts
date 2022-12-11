import { config } from "dotenv";

const isEvnExist = config();

if(isEvnExist.error) {
    throw new Error("There is no .env file :(")
}

const CONFIG = {
    DB_PORT: process.env.DB_PORT,
    API_PORT: process.env.API_PORT,
    DS_TYPE: process.env.DS_TYPE,
    DS_HOST: process.env.DS_HOST,
    DS_PORT: process.env.DS_PORT,
    DS_USERNAME: process.env.DS_USERNAME,
    DS_PASSWORD: process.env.DS_PASSWORD,
    DS_DATABASE: process.env.DS_DATABASE,
    api: {
        prefix: process.env.prefix ?? "/api"
    }
}

export default CONFIG;