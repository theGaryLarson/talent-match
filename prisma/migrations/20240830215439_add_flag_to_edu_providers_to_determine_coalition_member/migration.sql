BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[edu_providers] ADD [isCoalitionMember] BIT NOT NULL CONSTRAINT [edu_providers_isCoalitionMember_df] DEFAULT 0;

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
