import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1739521126649 implements MigrationInterface {
    name = 'Sync1739521126649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" SERIAL NOT NULL,
                "dateAdded" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "UQ_49fa2472467414ae956d9c11874" UNIQUE ("userId", "bookId"),
                CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '01-12-2000'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739521128297'
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739365996998'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '2000-01-12'
        `);
        await queryRunner.query(`
            DROP TABLE "favorites"
        `);
    }

}
