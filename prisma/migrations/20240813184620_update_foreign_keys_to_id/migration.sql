/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cfa_admin] DROP CONSTRAINT [fk_admin_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employer_user1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [fk_learner_user1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_user1];

-- DropForeignKey
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [fk_address_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[volunteers] DROP CONSTRAINT [fk_mentor_user1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_id_df] DEFAULT newid() FOR [id];

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_id_key] UNIQUE NONCLUSTERED ([id]);

-- AddForeignKey
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT [fk_address_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employer_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_learner_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT [fk_mentor_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
