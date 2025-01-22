import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastUpdatedToDeviceInfo1737553726951 implements MigrationInterface {
    name = 'AddLastUpdatedToDeviceInfo1737553726951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP COLUMN \`createdAt\``);
    }

}
