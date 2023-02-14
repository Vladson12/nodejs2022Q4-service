import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserTableCreation1676238451353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE IF NOT EXISTS "user" (
    //     "id" UUID PRIMARY KEY,
    //     "login" VARCHAR ( 50 ) NOT NULL,
    //     "password" VARCHAR ( 50 ) NOT NULL,
    //     "version" INTEGER NOT NULL DEFAULT 1,
    //     "createdAt" BIGINT NOT NULL,
    //     "updatedAt" BIGINT NOT NULL
    //     );`,
    // );
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'login',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'integer',
            default: 1,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'bigint',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
