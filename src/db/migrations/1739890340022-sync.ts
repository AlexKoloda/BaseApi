import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1739890340022 implements MigrationInterface {
    name = 'Sync1739890340022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
                RENAME COLUMN "bookId" TO "booksId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '01-12-2000'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739890341886'
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_905a88f740d014325193d881291" FOREIGN KEY ("booksId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_905a88f740d014325193d881291"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739886832081'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '2000-01-12'
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
                RENAME COLUMN "booksId" TO "bookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
