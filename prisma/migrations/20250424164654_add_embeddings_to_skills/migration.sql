BEGIN TRAN;
BEGIN TRY
    IF EXISTS (
        SELECT 1
        FROM sys.types
        WHERE name = 'vector'
    )
        BEGIN
            EXEC(N'
      ALTER TABLE [dbo].[skills]
      ADD [embedding] vector(1536);
    ');
        END
    ELSE
        BEGIN
            PRINT 'Skipping embedding column: VECTOR type not available locally.';
        END;

    COMMIT TRAN;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRAN;

    -- Re‑throw everything except "type not found" (2715)
    IF ERROR_NUMBER() <> 2715
        THROW;
END CATCH;
