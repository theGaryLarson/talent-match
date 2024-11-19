/*
  Warnings:
  - Added the required column `programCount` to the `edu_providers` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[edu_providers] ADD [contact] VARCHAR(45),
[cost] TEXT,
[mission] TEXT,
[programCount] TINYINT NOT NULL,
[providerDescription] TEXT,
[recruitingSources] TEXT,
[screeningCriteria] TEXT,
[setsApartStatement] TEXT;

-- CreateTable
CREATE TABLE [dbo].[ProviderTestimonials] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [ProviderTestimonials_id_df] DEFAULT newid(),
    [eduProviderId] UNIQUEIDENTIFIER NOT NULL,
    [url] VARCHAR(45),
    [author] VARCHAR(45),
    [quote] TEXT,
    CONSTRAINT [provider_testimonials_PRIMARY] PRIMARY KEY NONCLUSTERED ([id]),
    CONSTRAINT [provider_testimonials_id_UNIQUE] UNIQUE NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProviderTestimonials] ADD CONSTRAINT [ProviderTestimonials_eduProviderId_fkey] FOREIGN KEY ([eduProviderId]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
