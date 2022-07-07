import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1657199049490 implements MigrationInterface {
    name = 'migrations1657199049490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rosebaydev"."users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(196), "account_no" character varying(16) NOT NULL, "contact" character varying(15) NOT NULL, "password" text NOT NULL, "otp" jsonb, "role" "rosebaydev"."users_role_enum" NOT NULL DEFAULT 'USER', "balance" numeric NOT NULL DEFAULT '0', "status" "rosebaydev"."users_status_enum" NOT NULL, "rejection_reason" jsonb, CONSTRAINT "UQ_de9274b35f8bef39fd6883b2b22" UNIQUE ("account_no"), CONSTRAINT "UQ_6c71f479b6fd0e0f7e1b8d855e0" UNIQUE ("contact"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_de9274b35f8bef39fd6883b2b2" ON "rosebaydev"."users" ("account_no") `);
        await queryRunner.query(`CREATE TABLE "rosebaydev"."transaction" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "amount" numeric NOT NULL DEFAULT '0', "charge" numeric NOT NULL DEFAULT '0', "status" "rosebaydev"."transaction_status_enum" NOT NULL, "remarks" text NOT NULL, "recipient_id" integer, "sender_id" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rosebaydev"."deposit_withdraw" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "amount" numeric NOT NULL DEFAULT '0', "status" "rosebaydev"."deposit_withdraw_status_enum" NOT NULL, "remarks" text NOT NULL, "action" "rosebaydev"."deposit_withdraw_action_enum" NOT NULL, "user_id" integer, CONSTRAINT "PK_6e126de9d39d7c2cfa3920c7beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rosebaydev"."transaction" ADD CONSTRAINT "FK_927f99917551279dea7256537a9" FOREIGN KEY ("recipient_id") REFERENCES "rosebaydev"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rosebaydev"."transaction" ADD CONSTRAINT "FK_91a42be8fb1ac791a24fdf65048" FOREIGN KEY ("sender_id") REFERENCES "rosebaydev"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rosebaydev"."deposit_withdraw" ADD CONSTRAINT "FK_4fbbc618ca5d8d08c3cd5cefe79" FOREIGN KEY ("user_id") REFERENCES "rosebaydev"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rosebaydev"."deposit_withdraw" DROP CONSTRAINT "FK_4fbbc618ca5d8d08c3cd5cefe79"`);
        await queryRunner.query(`ALTER TABLE "rosebaydev"."transaction" DROP CONSTRAINT "FK_91a42be8fb1ac791a24fdf65048"`);
        await queryRunner.query(`ALTER TABLE "rosebaydev"."transaction" DROP CONSTRAINT "FK_927f99917551279dea7256537a9"`);
        await queryRunner.query(`DROP TABLE "rosebaydev"."deposit_withdraw"`);
        await queryRunner.query(`DROP TABLE "rosebaydev"."transaction"`);
        await queryRunner.query(`DROP INDEX "rosebaydev"."IDX_de9274b35f8bef39fd6883b2b2"`);
        await queryRunner.query(`DROP TABLE "rosebaydev"."users"`);
    }

}
