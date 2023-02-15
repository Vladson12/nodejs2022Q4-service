import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AlbumTableCreation1676402272025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'album',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['artistId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'artist',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('album');
  }
}
