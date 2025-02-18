import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1739891050211 implements MigrationInterface {
    name = 'Sync1739891050211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '01-12-2000'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739891051487'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739891022454'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '2000-01-12'
        `);
    }

}
