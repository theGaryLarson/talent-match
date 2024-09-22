/*
  Warnings:

  - You are about to drop the column `city` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user_addresses` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[user_addresses] DROP COLUMN [city],
[county],
[state];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
