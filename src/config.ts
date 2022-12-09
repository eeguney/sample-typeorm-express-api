import { config } from "dotenv";

const isEvnExist = config();

if(isEvnExist.error) {
    throw new Error("There is no .env file :(")
}

const CONFIG = {
    DB_PORT: process.env.DB_PORT,
    API_PORT: process.env.API_PORT,
    api: {
        prefix: '/api'
    }
}

export default CONFIG;