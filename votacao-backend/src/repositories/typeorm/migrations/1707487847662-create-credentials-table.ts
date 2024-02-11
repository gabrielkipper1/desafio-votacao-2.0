import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCredentialsTable1707487847662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "credential",
                columns: [
                    {
                        name: "user_id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "password",
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
