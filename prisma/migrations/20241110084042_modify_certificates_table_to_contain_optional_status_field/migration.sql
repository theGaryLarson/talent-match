BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[certificates] ADD [status] VARCHAR(45);

-- AlterTable
ALTER TABLE [dbo].[Meeting] DROP CONSTRAINT [Meeting_id_df];
ALTER TABLE [dbo].[Meeting] ADD CONSTRAINT [Meeting_id_df] DEFAULT newid() FOR [id];

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
