import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserAdminTable1707315160933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Creating admin table");
        await queryRunner.createTable(new Table(
            {
                name: "user_admin",
                columns: [
                    {
                        name: "user_id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
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
