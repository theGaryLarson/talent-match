/*
  Warnings:

  - You are about to drop the column `skill_description` on the `skills` table. All the data in the column will be lost.
  - Added the required column `skill_info_url` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
-- Removed the non-existent constraint drop statement for case_mgmt
-- ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [DF__case_mgmt__case___00DF2177];

-- AlterTable
-- Removed the non-existent constraint drop statement for project_experiences
-- ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [DF__project_e__proj___01D345B0];

-- AlterTable
-- Check if there is an existing default constraint on skill_subcategory_id and drop it
DECLARE @constraint_name NVARCHAR(200)
SELECT @constraint_name = name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('dbo.skill_subcategories')
  AND col_name(parent_object_id, parent_column_id) = 'skill_subcategory_id'

    IF @constraint_name IS NOT NULL
BEGIN
EXEC('ALTER TABLE dbo.skill_subcategories DROP CONSTRAINT ' + @constraint_name)
END

-- Add a new default constraint for skill_subcategory_id
ALTER TABLE [dbo].[skill_subcategories]
    ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df]
    DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[skills] ALTER COLUMN [skill_name] VARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[skills] DROP COLUMN [skill_description];
ALTER TABLE [dbo].[skills] ADD [skill_info_url] VARCHAR(255) NOT NULL DEFAULT '';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
ROLLBACK TRAN;
END;
THROW

END CATCH
