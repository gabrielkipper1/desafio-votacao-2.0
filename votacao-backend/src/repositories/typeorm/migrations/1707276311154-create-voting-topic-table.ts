import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVotingTopicTable1707276311154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "topic",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "category",
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
