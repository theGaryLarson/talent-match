/*
  Warnings:

  - Added the required column `careerPrepTrack` to the `CaseMgmt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepEnrollmentStatus` to the `CaseMgmt` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmt] ADD [careerPrepApplicationJobseekerId] UNIQUEIDENTIFIER,
[careerPrepTrack] VARCHAR(15) NOT NULL,
[prepEnrollmentStatus] VARCHAR(30) NOT NULL,
[prepExpectedEndDate] DATETIME,
[prepStartDate] DATETIME,
[ratingCareerReadiness] TINYINT,
[ratingSoftSkills] TINYINT,
[ratingTechSkill] TINYINT;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[CareerPrepApplication] (
    [career_prep_app_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [CareerPrepApplication_career_prep_app_id_df] DEFAULT newid(),
    [applicationDate] DATETIME2 NOT NULL,
    [pronouns] VARCHAR(15) NOT NULL,
    [expectedEduCompletion] VARCHAR(45),
    [experienceWithApplying] BIT NOT NULL,
    [experienceWithInterview] BIT NOT NULL,
    [experienceInIT] BIT NOT NULL,
    CONSTRAINT [career_prep_app_PRIMARY] PRIMARY KEY NONCLUSTERED ([career_prep_app_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CareerPrepApplication] ADD CONSTRAINT [fk_career_prep_app_jobseeker1] FOREIGN KEY ([career_prep_app_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_careerPrepApplicationJobseekerId_fkey] FOREIGN KEY ([careerPrepApplicationJobseekerId]) REFERENCES [dbo].[CareerPrepApplication]([career_prep_app_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
