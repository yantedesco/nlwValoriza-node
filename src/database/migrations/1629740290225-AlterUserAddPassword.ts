import { query } from "express";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1629740290225 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"users",
			new TableColumn({
				name: "password",
				type: "varchar",
				isNullable: true,
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropColumn("users", "password");
	}
}
