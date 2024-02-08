import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVoteTable1707276296151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Creating vote table");
        await queryRunner.createTable(new Table(
            {
                name: "vote",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "vote",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "topic_id",
                        type: "integer",
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
