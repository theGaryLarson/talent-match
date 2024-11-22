BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[TrainingPartnerDetail] (
    [edu_providers_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [partnerDetail_PRIMARY] PRIMARY KEY NONCLUSTERED ([edu_providers_id])
);

-- CreateTable
CREATE TABLE [dbo].[TraineeDetail] (
    [jobseekerId] UNIQUEIDENTIFIER NOT NULL,
    [nonCompletionReason] VARCHAR(45),
    [isVerified] BIT NOT NULL CONSTRAINT [DF_trainee_isVerified] DEFAULT 0,
    CONSTRAINT [traineeDetail_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId])
);

-- CreateTable
CREATE TABLE [dbo].[OtherPriorityPopulations] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [option] VARCHAR(45) NOT NULL,
    CONSTRAINT [otherPriorityPopulations_PRIMARY] PRIMARY KEY NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_OtherPriorityPopulations] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_OtherPriorityPopulations_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_OtherPriorityPopulations_B_index] ON [dbo].[_OtherPriorityPopulations]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[TrainingPartnerDetail] ADD CONSTRAINT [fk_partnerDetail_providers1] FOREIGN KEY ([edu_providers_id]) REFERENCES [dbo].[edu_providers]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TraineeDetail] ADD CONSTRAINT [fk_traineeDetail_jobseekers1] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_OtherPriorityPopulations] ADD CONSTRAINT [_OtherPriorityPopulations_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[OtherPriorityPopulations]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_OtherPriorityPopulations] ADD CONSTRAINT [_OtherPriorityPopulations_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[TraineeDetail]([jobseekerId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
