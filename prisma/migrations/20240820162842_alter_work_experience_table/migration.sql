BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[work_experiences] ADD [sector_id] UNIQUEIDENTIFIER;

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_work_experience_jobseeker1_idx] ON [dbo].[work_experiences]([sector_id]);

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_eperiences_industry_sectors1] FOREIGN KEY ([sector_id]) REFERENCES [dbo].[industry_sectors]([industry_sector_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
