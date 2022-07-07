import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1657119063439 implements MigrationInterface {
    name = 'migrations1657119063439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rosebaydev"."users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(196), "email" character varying(75), "account_no" character varying(16) NOT NULL, "contact" character varying(15) NOT NULL, "password" text NOT NULL, "role" "rosebaydev"."users_role_enum" NOT NULL DEFAULT 'USER', "status" "rosebaydev"."users_status_enum" NOT NULL, "avatar" text, "rejection_reason" jsonb, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_de9274b35f8bef39fd6883b2b22" UNIQUE ("account_no"), CONSTRAINT "UQ_6c71f479b6fd0e0f7e1b8d855e0" UNIQUE ("contact"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_de9274b35f8bef39fd6883b2b2" ON "rosebaydev"."users" ("account_no") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "rosebaydev"."IDX_de9274b35f8bef39fd6883b2b2"`);
        await queryRunner.query(`DROP TABLE "rosebaydev"."users"`);
    }

}
