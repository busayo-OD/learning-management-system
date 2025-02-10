import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastUpdatedToDeviceInfo1739194003802 implements MigrationInterface {
    name = 'AddLastUpdatedToDeviceInfo1739194003802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class_section\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`teacher_subject\` ADD CONSTRAINT \`FK_9637c243e0ff941fd4a3389241b\` FOREIGN KEY (\`class_id\`) REFERENCES \`class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teacher_subject\` ADD CONSTRAINT \`FK_7015c3aa4353ae609d1a06492f7\` FOREIGN KEY (\`section_id\`) REFERENCES \`class_section\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher_subject\` DROP FOREIGN KEY \`FK_7015c3aa4353ae609d1a06492f7\``);
        await queryRunner.query(`ALTER TABLE \`teacher_subject\` DROP FOREIGN KEY \`FK_9637c243e0ff941fd4a3389241b\``);
        await queryRunner.query(`ALTER TABLE \`class_section\` DROP COLUMN \`description\``);
    }

}
