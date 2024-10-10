/*
  Warnings:

  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `users` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [DF__jobseeker__disability__3F115E1A];
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [DF__jobseeker__has_d__3F115E1A] DEFAULT 'prefer not to say' FOR [disability];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[users] DROP COLUMN [gender],
[race];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
