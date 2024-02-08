import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVoteTable1707276296151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "vote",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
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
