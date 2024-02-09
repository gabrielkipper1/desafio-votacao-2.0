import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVotingSessionTable1707312453667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "session",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "topic_id",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "start_date",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "end_date",
                        type: "timestamp with time zone",
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
