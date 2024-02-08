import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1707349833140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase("votingapp", true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
