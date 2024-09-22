/*
  Warnings:

  - A unique constraint covering the columns `[company_id,zip_region]` on the table `company_addresses` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateIndex
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT [company_addresses_company_id_zip_unique] UNIQUE NONCLUSTERED ([company_id], [zip_region]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
