/*
  Warnings:

  - You are about to drop the column `user_name` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `role` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[contacts] DROP COLUMN [user_name];
ALTER TABLE [dbo].[contacts] ADD [role] VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[project_experiences] ALTER COLUMN [problem_solved_description] NTEXT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[social_media_platforms] ALTER COLUMN [social_logo] IMAGE NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [responsibilities] NTEXT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
