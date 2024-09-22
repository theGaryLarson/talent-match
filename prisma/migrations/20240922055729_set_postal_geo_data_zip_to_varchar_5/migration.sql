/*
  Warnings:

  - The primary key for the `postal_geo_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `zip` on the `postal_geo_data` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(5)`.
  - You are about to alter the column `zip` on the `user_addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(10)` to `VarChar(5)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[postal_geo_data] DROP CONSTRAINT [postal_codes_PRIMARY];
ALTER TABLE [dbo].[postal_geo_data] ALTER COLUMN [zip] VARCHAR(5) NOT NULL;
ALTER TABLE [dbo].[postal_geo_data] ADD CONSTRAINT postal_codes_PRIMARY PRIMARY KEY NONCLUSTERED ([zip]);

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[user_addresses] ALTER COLUMN [zip] VARCHAR(5) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT [fk_] FOREIGN KEY ([zip]) REFERENCES [dbo].[postal_geo_data]([zip]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
