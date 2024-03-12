import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenUserAndProfile1710265473777
  implements MigrationInterface
{
  name = 'AddRelationBetweenUserAndProfile1710265473777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" int NOT NULL IDENTITY(1,1), "fullName" nvarchar(255) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "profileId" int`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_9466682df91534dd95e4dbaa61" ON "user" ("profileId") WHERE "profileId" IS NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`,
    );
    await queryRunner.query(
      `DROP INDEX "REL_9466682df91534dd95e4dbaa61" ON "user"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
