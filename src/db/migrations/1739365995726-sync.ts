import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1739365995726 implements MigrationInterface {
    name = 'Sync1739365995726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "dateOfCreate" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
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
            SET DEFAULT 'User1739365996998'
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_9eb8ce066f46b656be75d847150" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_9eb8ce066f46b656be75d847150"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1739261535154'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '2000-01-12'
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
    }

}
