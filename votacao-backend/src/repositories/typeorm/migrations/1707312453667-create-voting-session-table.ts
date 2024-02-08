import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVotingSessionTable1707312453667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Creating voting session table");
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
                        name: "topic_id",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "start_date",
                        type: "timestamptz",
                        isNullable: false,
                    },
                    {
                        name: "end_date",
                        type: "timestamptz",
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
