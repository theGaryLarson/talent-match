BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[postal_geo_data] (
    [zip] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(100) NOT NULL,
    [county] NVARCHAR(100) NOT NULL,
    [state_code] VARCHAR(2) NOT NULL,
    [state] NVARCHAR(100) NOT NULL,
    [lat] FLOAT(53) NOT NULL,
    [lng] FLOAT(53) NOT NULL,
    CONSTRAINT [postal_codes_PRIMARY] PRIMARY KEY NONCLUSTERED ([zip])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [postal_code_lat_lng_idx] ON [dbo].[postal_geo_data]([lat], [lng]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
