/*
  Warnings:

  - You are about to alter the column `zip_region` on the `company_addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `VarChar(5)`.
  - You are about to alter the column `zip` on the `edu_addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `VarChar(5)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[company_addresses] ALTER COLUMN [zip_region] VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[edu_addresses] ALTER COLUMN [zip] VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AddForeignKey
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT [fk_company_address_postgeodata1] FOREIGN KEY ([zip_region]) REFERENCES [dbo].[postal_geo_data]([zip]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_postgeodata1] FOREIGN KEY ([zip]) REFERENCES [dbo].[postal_geo_data]([zip]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
