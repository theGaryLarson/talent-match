BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_technology_areas1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [technology_area_id] UNIQUEIDENTIFIER NULL;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[technology_areas]([technology_area_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
