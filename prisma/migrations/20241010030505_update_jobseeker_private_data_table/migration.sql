/*
  Warnings:

  - You are about to drop the column `has_disability` on the `jobseekers_private_data` table. All the data in the column will be lost.

*/
BEGIN TRY

    BEGIN TRAN;

-- Drop the default constraint on the 'has_disability' column before dropping the column
    ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [DF__jobseeker__has_d__3F115E1A];

-- Now drop the 'has_disability' column
    ALTER TABLE [dbo].[jobseekers_private_data] DROP COLUMN [has_disability];

-- Add new column with updated constraints
    ALTER TABLE [dbo].[jobseekers_private_data]
        ADD [disability] VARCHAR(45) NOT NULL CONSTRAINT [DF__jobseeker__disability__3F115E1A] DEFAULT 'prefer not to say',
            [ethnicity] VARCHAR(45) NOT NULL CONSTRAINT [jobseekers_private_data_ethnicity_df] DEFAULT 'undisclosed',
            [gender] VARCHAR(45) NOT NULL CONSTRAINT [jobseekers_private_data_gender_df] DEFAULT 'undisclosed',
            [race] VARCHAR(45) NOT NULL CONSTRAINT [jobseekers_private_data_race_df] DEFAULT 'undisclosed';

-- Commit the transaction if no errors
    COMMIT TRAN;

END TRY
BEGIN CATCH

    -- Rollback the transaction if any errors occur
    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW

END CATCH
