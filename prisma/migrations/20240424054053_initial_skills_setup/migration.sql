BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[subcategories] (
    [id] CHAR(36) NOT NULL,
    [skill_category] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255),
    CONSTRAINT [PK__subcateg__3213E83F064F714D] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[skills] (
    [id] CHAR(36) NOT NULL,
    [subcategory_id] CHAR(36) NOT NULL,
    [skill] VARCHAR(255) NOT NULL,
    [info_url] VARCHAR(255),
    CONSTRAINT [PK__skills__3213E83FEC93D05F] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_skill] UNIQUE NONCLUSTERED ([skill])
);

-- AddForeignKey
ALTER TABLE [dbo].[skills] ADD CONSTRAINT [FK_subcategory_id] FOREIGN KEY ([subcategory_id]) REFERENCES [dbo].[subcategories]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
