import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenUserAndPost1710267119075
  implements MigrationInterface
{
  name = 'AddRelationBetweenUserAndPost1710267119075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "userId" int, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`,
    );
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
