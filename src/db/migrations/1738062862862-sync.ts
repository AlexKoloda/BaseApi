import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738062862862 implements MigrationInterface {
    name = 'Sync1738062862862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738062864117'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738049040604'
        `);
    }

}
