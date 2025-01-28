import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBookGenre1738049039165 implements MigrationInterface {
    name = 'UserBookGenre1738049039165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "author" TO "authorId"
        `);
        await queryRunner.query(`
            CREATE TABLE "author" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_d3962fd11a54d87f927e84d1080" UNIQUE ("name"),
                CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genre" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "genreId" integer,
                CONSTRAINT "PK_f316eed809f6f7617821012ad05" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "authorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "authorId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738049040604'
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre"
            ADD CONSTRAINT "FK_d3446a42df5e6f8158a5bd10f1a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre"
            ADD CONSTRAINT "FK_564b744154ba1b5bc35e851f8bc" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre" DROP CONSTRAINT "FK_564b744154ba1b5bc35e851f8bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre" DROP CONSTRAINT "FK_d3446a42df5e6f8158a5bd10f1a"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1737017651767'
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "authorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "authorId" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "book_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "author"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "authorId" TO "author"
        `);
    }

}
