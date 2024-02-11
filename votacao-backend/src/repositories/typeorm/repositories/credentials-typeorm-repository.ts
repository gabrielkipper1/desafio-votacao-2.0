import { Equal, Repository } from "typeorm";
import { AuthRepository } from "../../interfaces/auth-repository";
import { User } from "../../../entities/user";
import { UserPassword } from "../../../entities/user-password";

export class AuthTypeORMRepository implements AuthRepository {
    private readonly repository: Repository<UserPassword>;

    constructor(repository: Repository<UserPassword>) {
        this.repository = repository;
    }

    public async saveCredentials(id: number, password: string): Promise<boolean> {
        const credentials = UserPassword.create(id, password);
        const result = await this.repository.save(credentials);
        return !result ? false : true;
    }

    public async getCredentials(id: number): Promise<UserPassword | undefined> {
        console.log("Buscando credenciais para o usuário", id);
        const credentials = await this.repository.findOne({ where: { userId: Equal(id) } });
        return credentials ? credentials : undefined; //typeorm returns null, but typescript works with undefined
    }
}