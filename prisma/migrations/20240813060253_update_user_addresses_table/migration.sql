/*
  Warnings:

  - You are about to drop the column `contact_email` on the `edu_institutions` table. All the data in the column will be lost.
  - The primary key for the `user_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact_address_id` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the `timestamps` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_address_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

    BEGIN TRAN;

-- AlterTable for case_mgmt
    IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'case_mgmt_case_mgmt_id_df')
        BEGIN
            ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
        END

    ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable for edu_institutions
    IF EXISTS (SELECT 1 FROM sys.columns WHERE name = 'contact_email' AND object_id = OBJECT_ID('dbo.edu_institutions'))
        BEGIN
            ALTER TABLE [dbo].[edu_institutions] DROP COLUMN [contact_email];
        END

    IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE name = 'user_email' AND object_id = OBJECT_ID('dbo.edu_institutions'))
        BEGIN
            ALTER TABLE [dbo].[edu_institutions] ADD [user_email] VARCHAR(255);
        END

-- AlterTable for jobseekers_education
    IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'jobseekers_education_jobseeker_ed_id_df')
        BEGIN
            ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df];
        END

    ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id];

-- AlterTable for project_experiences
    IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'project_experiences_proj_exp_id_df')
        BEGIN
            ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
        END

    ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable for skill_subcategories
    IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'skill_subcategories_skill_subcategory_id_df')
        BEGIN
            ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
        END

    ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable for user_addresses
    IF EXISTS (SELECT 1 FROM sys.key_constraints WHERE name = 'contact_addresses_PRIMARY')
        BEGIN
            ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [contact_addresses_PRIMARY];
        END

    IF EXISTS (SELECT 1 FROM sys.columns WHERE name = 'contact_address_id' AND object_id = OBJECT_ID('dbo.user_addresses'))
        BEGIN
            ALTER TABLE [dbo].[user_addresses] DROP COLUMN [contact_address_id];
        END

    IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE name = 'user_address_id' AND object_id = OBJECT_ID('dbo.user_addresses'))
        BEGIN
            ALTER TABLE [dbo].[user_addresses] ADD [user_address_id] NVARCHAR(36) NOT NULL;
        END

    IF NOT EXISTS (SELECT 1 FROM sys.key_constraints WHERE name = 'user_addresses_PRIMARY')
        BEGIN
            ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT user_addresses_PRIMARY PRIMARY KEY NONCLUSTERED ([user_address_id]);
        END

-- DropTable for timestamps
    IF EXISTS (SELECT 1 FROM sys.objects WHERE name = 'timestamps' AND type = 'U')
        BEGIN
            DROP TABLE [dbo].[timestamps];
        END

    COMMIT TRAN;

END TRY
BEGIN CATCH

    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW

END CATCH
