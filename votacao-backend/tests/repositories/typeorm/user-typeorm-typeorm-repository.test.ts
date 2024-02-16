import { UserRepository } from "../../../src/repositories/interfaces/user-repository";
import { User } from "../../../src/entities/user";
import { UserSchema } from "../../../src/repositories/typeorm/schemas/user-schema";
import { SqliteDataSource } from "../../../src/repositories/typeorm/data-sources/sqlite-connetion";
import { DataSource, Repository } from "typeorm";
import { UserTypeORMRepository } from "../../../src/repositories/typeorm/repositories/user-typeorm-repository";

let dataSource: DataSource;
let repository: UserRepository;

beforeAll(async () => {
    dataSource = await SqliteDataSource.initialize();
    repository = new UserTypeORMRepository(SqliteDataSource.getRepository<User>(UserSchema));
});

afterAll(async () => {
    dataSource.destroy();
});

describe('UserTypeORMRepository', () => {
    it('should create a new user', async () => {
        const user = User.create("Foo User", "foo@test.com", "1234");
        const insertedUser = await repository.saveUser(user);
        expect(insertedUser).toBeInstanceOf(User);
    });

    it('should get a user by id', async () => {
        const userId = 1;
        const user = await repository.getUserById(userId);
        expect(user?.id).toBe(userId);
    });

    it('should get user by email', async () => {
        const user = await repository.getUserByEmail("foo@test.com");
        expect(user?.email).toBe("foo@test.com");
    });

    it('should get user by cpf', async () => {
        const user = await repository.getUserByCpf("1234");
        expect(user?.cpf).toBe("1234");
    });
});