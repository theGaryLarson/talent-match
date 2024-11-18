BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[JobPlacement] (
    [job_placement_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobPlacement_job_placement_id_df] DEFAULT newid(),
    [employmentStatus] VARCHAR(45),
    [jobStartDate] DATETIME,
    [employmentType] VARCHAR(45),
    [earnLearnType] VARCHAR(45),
    [naicsCode] VARCHAR(45),
    [employerName] VARCHAR(45) NOT NULL,
    [hourlyEarnings] VARCHAR(15) NOT NULL,
    CONSTRAINT [job_placement_PRIMARY] PRIMARY KEY NONCLUSTERED ([job_placement_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[JobPlacement] ADD CONSTRAINT [fk_job_placement_jobseeker1] FOREIGN KEY ([job_placement_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
