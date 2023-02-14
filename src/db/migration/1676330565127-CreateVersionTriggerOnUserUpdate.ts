import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVersionTriggerOnUserUpdate1676330565127
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION fn_update_version() RETURNS trigger AS $$
        BEGIN
            new.version := old.version + 1;
        RETURN NEW;    
        END;
        $$ LANGUAGE plpgsql;`,
    );

    await queryRunner.query(
      `CREATE OR REPLACE TRIGGER tg_user_update
        BEFORE UPDATE ON public."user"
        FOR EACH ROW
        EXECUTE FUNCTION fn_update_version();`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS tg_user_update ON user`);

    await queryRunner.query(`DROP FUNCTION IF EXISTS fn_update_version`);
  }
}
