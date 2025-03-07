import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastUpdatedToDeviceInfo1741350694049 implements MigrationInterface {
    name = 'AddLastUpdatedToDeviceInfo1741350694049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parent\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`parent\` DROP COLUMN \`deleted_at\``);
    }

}
