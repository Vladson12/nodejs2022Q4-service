import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableCreation1676238451353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" (
        "id" UUID PRIMARY KEY,
        "login" VARCHAR ( 50 ) NOT NULL,
        "password" VARCHAR ( 50 ) NOT NULL,
        "version" INTEGER NOT NULL DEFAULT 1,
        "createdAt" BIGINT NOT NULL,
        "updatedAt" BIGINT NOT NULL
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
