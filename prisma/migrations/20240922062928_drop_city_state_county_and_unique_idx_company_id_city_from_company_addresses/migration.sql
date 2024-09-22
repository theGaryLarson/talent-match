/*
  Warnings:

  - You are about to drop the column `city` on the `company_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `company_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `company_addresses` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[company_addresses] DROP CONSTRAINT [company_addresses_company_id_city_unique];

-- AlterTable
ALTER TABLE [dbo].[company_addresses] DROP COLUMN [city],
[county],
[state];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
