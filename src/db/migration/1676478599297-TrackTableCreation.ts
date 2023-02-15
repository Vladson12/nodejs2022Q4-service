import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TrackTableCreation1676478599297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'track',
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
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'albumId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['artistId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'artist',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['albumId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'album',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('track');
  }
}
