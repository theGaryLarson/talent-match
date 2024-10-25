BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [fk_social_media_employer_employer1];

-- DropForeignKey
ALTER TABLE [dbo].[company_testimonials] DROP CONSTRAINT [fk_company_testimonals_employer1];

-- AlterTable
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NULL;

-- AlterTable
ALTER TABLE [dbo].[company_testimonials] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_employer_employer1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_testimonials] ADD CONSTRAINT [fk_company_testimonals_employer1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
