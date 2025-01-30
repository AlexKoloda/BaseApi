import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738243686767 implements MigrationInterface {
    name = 'Sync1738243686767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" double precision NOT NULL DEFAULT '14.99'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738243688123'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738062864117'
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" character varying NOT NULL
        `);
    }

}
