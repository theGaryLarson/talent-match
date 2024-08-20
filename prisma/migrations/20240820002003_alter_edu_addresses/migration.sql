/*
  Warnings:

  - You are about to drop the column `edu_institution_id` on the `edu_addresses` table. All the data in the column will be lost.
  - Added the required column `edu_provider_id` to the `edu_addresses` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[edu_addresses] DROP CONSTRAINT [fk_edu_address_edu_institution1];

-- DropIndex
DROP INDEX [edu_addresses_fk_edu_address_edu_institution1_idx] ON [dbo].[edu_addresses];

-- AlterTable
ALTER TABLE [dbo].[edu_addresses] DROP COLUMN [edu_institution_id];
ALTER TABLE [dbo].[edu_addresses] ADD [edu_provider_id] UNIQUEIDENTIFIER NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
CREATE NONCLUSTERED INDEX [edu_addresses_fk_edu_address_edu_institution1_idx] ON [dbo].[edu_addresses]([edu_provider_id]);

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_edu_institution1] FOREIGN KEY ([edu_provider_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
