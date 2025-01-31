import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738314535572 implements MigrationInterface {
    name = 'Sync1738314535572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "dataIssue" date NOT NULL DEFAULT '01-12-2000'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "numberBooksStock" integer NOT NULL DEFAULT '2'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738314536994'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738243688123'
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "numberBooksStock"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "dataIssue"
        `);
    }

}
