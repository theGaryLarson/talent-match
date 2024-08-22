/*
  Warnings:

  - You are about to drop the `edu_institutions` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[edu_addresses] DROP CONSTRAINT [fk_edu_address_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_edu_institution1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[edu_institutions];

-- CreateTable
CREATE TABLE [dbo].[edu_providers] (
    [edu_institution_id] UNIQUEIDENTIFIER NOT NULL,
    [name] VARCHAR(255),
    [contact_email] VARCHAR(255),
    [edu_url] VARCHAR(255),
    CONSTRAINT [edu_institutions_PRIMARY] PRIMARY KEY NONCLUSTERED ([edu_institution_id]),
    CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE] UNIQUE NONCLUSTERED ([edu_institution_id]),
    CONSTRAINT [edu_providers_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_providers]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
