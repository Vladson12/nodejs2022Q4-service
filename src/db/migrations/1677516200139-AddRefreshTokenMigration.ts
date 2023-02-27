import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenMigration1677516200139
  implements MigrationInterface
{
  name = 'AddRefreshTokenMigration1677516200139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
