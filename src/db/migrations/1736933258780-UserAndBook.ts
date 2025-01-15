import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndBook1736933258780 implements MigrationInterface {
    name = 'UserAndBook1736933258780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "avatar" character varying NOT NULL DEFAULT '',
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "photo" character varying NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "description" character varying NOT NULL,
                "price" character varying NOT NULL,
                "isNew" boolean NOT NULL,
                "isBestseller" boolean NOT NULL,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
