/*
  Warnings:

  - You are about to drop the column `isITDegree` on the `jobseekers_education` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- Drop the default constraint for the column `isITDegree`
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_isITDegree_df];

-- Drop the column `isITDegree`
ALTER TABLE [dbo].[jobseekers_education] DROP COLUMN [isITDegree];

-- Add the new column `is_tech_degree` with a default constraint
ALTER TABLE [dbo].[jobseekers_education] ADD [is_tech_degree] BIT CONSTRAINT [jobseekers_education_is_tech_degree_df] DEFAULT 0;

-- Drop and recreate the default constraint on the `skill_subcategory_id` column in the `skill_subcategories` table
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
