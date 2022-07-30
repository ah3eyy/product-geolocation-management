import mongoose from "mongoose";
import LoggerInstance from "../loader/logger";
import config from "../config/index";

export default async () => {
    try {
        const {connection} = await mongoose.connect(config.databaseURL);
        LoggerInstance.info(`✌️MongoDB connected to ${config.databaseURL}✌ ️`);
        return connection.db;
    } catch (error) {
        throw error;
    }
}

