import { Repository } from "typeorm/repository/Repository";
import { VotingSession } from "../../../entities/voting-session";
import { TypeORMDataSource } from "../typeorm-postgres-data-source";
import { VotingSessionSchema } from "../schemas/voting-session-schema";

export class VotingSessionTypeormRepository {
    repository: Repository<VotingSession> = TypeORMDataSource.getRepository<VotingSession>(VotingSessionSchema);
}