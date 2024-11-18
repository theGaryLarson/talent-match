BEGIN TRY

    BEGIN TRAN;

-- Drop Foreign Keys and Indexes that reference the old columns
    ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [CaseMgmt_jobseeker_id_fkey];
    ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [fk_case_mgmt_user1];
    DROP INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[CaseMgmt];
    DROP INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[CaseMgmt];

-- Drop Primary Key Constraint if it references old column
    ALTER TABLE [dbo].[CaseMgmt] DROP CONSTRAINT [case_mgmt_PRIMARY];

-- Rename the columns using sp_rename
    EXEC sp_rename 'dbo.CaseMgmt.jobseeker_id', 'jobseekerId', 'COLUMN';
    EXEC sp_rename 'dbo.CaseMgmt.cfa_admin_id', 'managerId', 'COLUMN';

-- Recreate Primary Key Constraint with the new column name
    ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [case_mgmt_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseekerId]);

-- Recreate Indexes with the new column names
    CREATE NONCLUSTERED INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[CaseMgmt]([managerId]);
    CREATE NONCLUSTERED INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[CaseMgmt]([jobseekerId]);

-- Recreate Foreign Keys with the new column names
    ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [CaseMgmt_jobseekerId_fkey] FOREIGN KEY ([jobseekerId]) REFERENCES [dbo].[CareerPrepAssessment]([jobseekerId]) ON DELETE NO ACTION ON UPDATE CASCADE;
    ALTER TABLE [dbo].[CaseMgmt] ADD CONSTRAINT [fk_case_mgmt_user1] FOREIGN KEY ([managerId]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

    COMMIT TRAN;

END TRY
BEGIN CATCH

    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW

END CATCH;
