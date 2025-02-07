import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1738761873779 implements MigrationInterface {
    name = 'Sync1738761873779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "totalPrice"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "cartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "bookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738761875083'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '01-12-2000'
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dataIssue"
            SET DEFAULT '2000-01-12'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "name"
            SET DEFAULT 'User1738663355443'
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "bookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "cartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "totalPrice" integer NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
