/*
  Warnings:

  - You are about to drop the `case_mgmt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cfa_admin` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_admin1];

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[cfa_admin] DROP CONSTRAINT [fk_admin_contacts1];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- DropTable
DROP TABLE [dbo].[case_mgmt];

-- DropTable
DROP TABLE [dbo].[cfa_admin];

-- CreateTable
CREATE TABLE [dbo].[cfa_case_mgmt] (
    [admin_id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [cfa_admin_PRIMARY] PRIMARY KEY NONCLUSTERED ([admin_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cfa_admin_fk_admin_contacts1_idx] ON [dbo].[cfa_case_mgmt]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[cfa_case_mgmt] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
