import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { User } from "../../../entities/user";

export class CreateUserTable1707265027687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Creating user table");
        await queryRunner.createTable(new Table(
            {
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isNullable: false,
                    },
                ]
            }
        ),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
