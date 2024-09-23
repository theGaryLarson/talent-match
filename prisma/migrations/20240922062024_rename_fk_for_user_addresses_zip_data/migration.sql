BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- RenameForeignKey
EXEC sp_rename 'dbo.fk_', 'fk_user_address_postgeodata1', 'OBJECT';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
