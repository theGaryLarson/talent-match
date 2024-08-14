/*
  Warnings:

  - You are about to drop the `contact_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cfa_admin] DROP CONSTRAINT [fk_admin_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[contact_addresses] DROP CONSTRAINT [fk_address_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employer_user1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [fk_learner_user1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_user1];

-- DropForeignKey
ALTER TABLE [dbo].[volunteers] DROP CONSTRAINT [fk_mentor_user1];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df];
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id];

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[contact_addresses];

-- DropTable
DROP TABLE [dbo].[contacts];

-- CreateTable
CREATE TABLE [dbo].[user_addresses] (
    [contact_address_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [zip] NVARCHAR(10) NOT NULL,
    [state] VARCHAR(255),
    [city] VARCHAR(255),
    [county] VARCHAR(255),
    CONSTRAINT [contact_addresses_PRIMARY] PRIMARY KEY NONCLUSTERED ([contact_address_id]),
    CONSTRAINT [user_addresses_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [user_id] NVARCHAR(36) NOT NULL,
    [role] VARCHAR(255) NOT NULL,
    [first_name] VARCHAR(255),
    [last_name] VARCHAR(255),
    [birthdate] DATETIME,
    [email] VARCHAR(255) NOT NULL,
    [email_verified] DATETIME,
    [phone] VARCHAR(16),
    [gender] VARCHAR(45),
    [race] VARCHAR(45),
    [photo_url] VARCHAR(255),
    [has_agreed_terms] BIT NOT NULL CONSTRAINT [users_has_agreed_terms_df] DEFAULT 0,
    [created_at] DATETIME NOT NULL,
    [updated_at] DATETIME,
    CONSTRAINT [contacts_PRIMARY] PRIMARY KEY NONCLUSTERED ([user_id]),
    CONSTRAINT [contacts_user_id_UNIQUE] UNIQUE NONCLUSTERED ([user_id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [contact_addresses_fk_address_contacts1_idx] ON [dbo].[user_addresses]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT [fk_address_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employer_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_learner_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT [fk_mentor_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
