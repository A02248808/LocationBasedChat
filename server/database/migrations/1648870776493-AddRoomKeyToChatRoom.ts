import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoomKeyToChatRoom1648870776493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chat_room',
      new TableColumn({
        name: 'roomKey',
        type: 'text',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chat_room', 'roomKey');
  }
}
