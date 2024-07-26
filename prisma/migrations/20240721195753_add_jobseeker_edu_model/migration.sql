BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[jobseeker_education] (
    [jobseeker_ed_id] NVARCHAR(36) NOT NULL CONSTRAINT [jobseeker_education_jobseeker_ed_id_df] DEFAULT newid(),
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [edu_institution_id] NVARCHAR(36) NOT NULL,
    [is_enrolled] BIT NOT NULL,
    [start_date] DATE NOT NULL,
    [graduation_date] NVARCHAR(45) NOT NULL,
    [degree_type] NVARCHAR(45) NOT NULL,
    [major] NVARCHAR(45) NOT NULL,
    [minor] NVARCHAR(45) NOT NULL,
    CONSTRAINT [jobseeker_education_pkey] PRIMARY KEY CLUSTERED ([jobseeker_ed_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_jobseeker1_idx] ON [dbo].[jobseeker_education]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseeker_education]([edu_institution_id]);

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_education] ADD CONSTRAINT [fk_jobseeker_education_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
