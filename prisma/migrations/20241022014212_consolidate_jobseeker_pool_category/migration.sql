BEGIN TRY

    BEGIN TRAN;

-- Drop the default constraints for pool1, pool2, and pool3 if they exist
    ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT IF EXISTS [jobseekers_pool1_df];
    ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT IF EXISTS [jobseekers_pool2_df];
    ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT IF EXISTS [jobseekers_pool3_df];

-- Drop the pool1, pool2, and pool3 columns
    ALTER TABLE [dbo].[jobseekers] DROP COLUMN [pool1], [pool2], [pool3];

-- Add the new assignedPool column
    ALTER TABLE [dbo].[jobseekers] ADD [assignedPool] VARCHAR(5);

    COMMIT TRAN;

END TRY
BEGIN CATCH

    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW;

END CATCH;
