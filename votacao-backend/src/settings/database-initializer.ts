import { TypeORMDataSource } from "../repositories/typeorm/data-sources/typeorm-postgres-data-source";

export class DatabaseInitializer {
    async initialize() {
        TypeORMDataSource.initialize();
    }
}