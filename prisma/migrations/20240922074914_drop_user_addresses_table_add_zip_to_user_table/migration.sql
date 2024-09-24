/*
  Warnings:

  - You are about to drop the `user_addresses` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [fk_address_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [fk_user_address_postgeodata1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[users] ADD [zip] VARCHAR(5);

-- DropTable
DROP TABLE [dbo].[user_addresses];

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [fk_user_address_postgeodata1] FOREIGN KEY ([zip]) REFERENCES [dbo].[postal_geo_data]([zip]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
