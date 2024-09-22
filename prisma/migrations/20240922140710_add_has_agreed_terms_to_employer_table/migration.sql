BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[employers] ADD [has_agreed_terms] BIT NOT NULL CONSTRAINT [employers_has_agreed_terms_df] DEFAULT 0;

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
