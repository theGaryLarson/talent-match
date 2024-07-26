/*
  Warnings:

  - The primary key for the `case_mgmt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idcase_mgmt` on the `case_mgmt` table. All the data in the column will be lost.
  - The primary key for the `certificates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project_experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `proj_xp_id` on the `project_experiences` table. All the data in the column will be lost.
  - Added the required column `case_mgmt_id` to the `case_mgmt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proj_exp_id` to the `project_experiences` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[project_has_skills] DROP CONSTRAINT [fk_project_experience_has_skill_project_experience1];

-- Add new columns before dropping the old ones
ALTER TABLE [dbo].[case_mgmt] ADD [case_mgmt_id] NVARCHAR(36) NOT NULL DEFAULT NEWID();
ALTER TABLE [dbo].[project_experiences] ADD [proj_exp_id] NVARCHAR(36) NOT NULL DEFAULT NEWID();

-- Update primary key constraints
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_PRIMARY];
ALTER TABLE [dbo].[case_mgmt] DROP COLUMN [idcase_mgmt];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT case_mgmt_PRIMARY PRIMARY KEY NONCLUSTERED ([case_mgmt_id]);

ALTER TABLE [dbo].[certificates] DROP CONSTRAINT [certificates_PRIMARY];
ALTER TABLE [dbo].[certificates] ALTER COLUMN [certification_id] NVARCHAR(36) NOT NULL;
ALTER TABLE [dbo].[certificates] ADD CONSTRAINT certificates_PRIMARY PRIMARY KEY NONCLUSTERED ([certification_id]);

ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_PRIMARY];
ALTER TABLE [dbo].[project_experiences] DROP COLUMN [proj_xp_id];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT project_experiences_PRIMARY PRIMARY KEY NONCLUSTERED ([proj_exp_id]);

-- Add default constraint for new UUID column in skill_subcategories
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- Recreate foreign key constraint
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT [fk_project_experience_has_skill_project_experience1] FOREIGN KEY ([proj_exp_id]) REFERENCES [dbo].[project_experiences]([proj_exp_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
ROLLBACK TRAN;
END;
    THROW

END CATCH
