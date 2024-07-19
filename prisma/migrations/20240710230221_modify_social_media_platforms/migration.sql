/*
  Warnings:

  - The primary key for the `social_media_platforms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `social_logo` on the `social_media_platforms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [fk_social_media_company_social_media_platform1];

-- DropIndex
DROP INDEX [company_social_links_fk_social_media_company_social_media_platform1_idx] ON [dbo].[company_social_links];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [social_platform_id] NVARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[social_media_platforms] DROP CONSTRAINT [social_media_platforms_PRIMARY];
ALTER TABLE [dbo].[social_media_platforms] ALTER COLUMN [social_platform_id] NVARCHAR(36) NOT NULL;
ALTER TABLE [dbo].[social_media_platforms] DROP COLUMN [social_logo];
ALTER TABLE [dbo].[social_media_platforms] ADD CONSTRAINT social_media_platforms_PRIMARY PRIMARY KEY NONCLUSTERED ([social_platform_id]);
ALTER TABLE [dbo].[social_media_platforms] ADD [social_logo] VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_social_links_fk_social_media_company_social_media_platform1_idx] ON [dbo].[company_social_links]([social_platform_id]);

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_company_social_media_platform1] FOREIGN KEY ([social_platform_id]) REFERENCES [dbo].[social_media_platforms]([social_platform_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
