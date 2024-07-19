/*
  Warnings:

  - The primary key for the `contact_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contract_address_id` on the `contact_addresses` table. All the data in the column will be lost.
  - You are about to alter the column `zip` on the `contact_addresses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `NVarChar(10)`.
  - Made the column `zip_region` on table `company_addresses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `contact_address_id` to the `contact_addresses` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

    BEGIN TRAN;

-- AlterTable
    ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
    ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
    ALTER TABLE [dbo].[company_addresses] ALTER COLUMN [zip_region] VARCHAR(10) NULL;

-- AlterTable
    ALTER TABLE [dbo].[contact_addresses] DROP CONSTRAINT [contact_addresses_PRIMARY];
    ALTER TABLE [dbo].[contact_addresses] ALTER COLUMN [zip] NVARCHAR(10) NOT NULL;
    ALTER TABLE [dbo].[contact_addresses] DROP COLUMN [contract_address_id];
    ALTER TABLE [dbo].[contact_addresses] ADD [contact_address_id] NVARCHAR(36) NOT NULL;
    ALTER TABLE [dbo].[contact_addresses] ADD CONSTRAINT contact_addresses_PRIMARY PRIMARY KEY NONCLUSTERED ([contact_address_id]);


-- AlterTable
    ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
    ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
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
