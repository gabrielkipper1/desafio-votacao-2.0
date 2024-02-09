import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVotingSessionTable1707436284940 implements MigrationInterface {

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
                        type: "datetime",
                        isNullable: false,
                    },
                    {
                        name: "end_date",
                        type: "datetime",
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
