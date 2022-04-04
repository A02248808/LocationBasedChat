import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddMessage1649034278232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'chatRoomId',
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'contents',
            type: 'text',
          },
          {
            name: 'userName',
            type: 'text',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'message',
      new TableForeignKey({
        columnNames: ['chatRoomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chat_room',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message');
  }
}
