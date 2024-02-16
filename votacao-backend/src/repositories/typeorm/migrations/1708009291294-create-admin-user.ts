import { MigrationInterface, QueryRunner } from "typeorm";
import { TypeORMDataSource } from "../data-sources/typeorm-postgres-data-source";
import { User } from "../../../entities/user";
import { UserSchema } from "../schemas/user-schema";
import { UserPasswordSchema } from "../schemas/credential-schema";
import { UserPassword } from "../../../entities/user-password";
import { AdminSchema } from "../schemas/admin-schema";
import { UserAdmin } from "../../../entities/user-admin";
import { BCryptPasswordEncoder } from "../../../data-parsers/credentials/bcrypt-password-encoder";

export class CreateAdminUser1708009291294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = TypeORMDataSource.getRepository<User>(UserSchema);
        const passwordRepository = TypeORMDataSource.getRepository<UserPassword>(UserPasswordSchema);
        const adminRepository = TypeORMDataSource.getRepository<UserAdmin>(AdminSchema);
        const passwordEncoder = new BCryptPasswordEncoder();

        const user = await userRepository.save(User.create("admin", "admin@test.com", "35207752049"));
        const credential = passwordRepository.save(UserPassword.create(user.id as number, await passwordEncoder.encode("admin")));
        const admin = adminRepository.save(UserAdmin.create(user.id as number, true))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
