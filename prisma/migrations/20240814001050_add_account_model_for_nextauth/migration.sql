BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [type] NVARCHAR(255) NOT NULL,
    [provider] NVARCHAR(255) NOT NULL,
    [provider_account_id] NVARCHAR(255) NOT NULL,
    [refresh_token] NVARCHAR(max),
    [access_token] NVARCHAR(max),
    [expires_at] INT,
    [token_type] NVARCHAR(255),
    [scope] NVARCHAR(255),
    [id_token] NVARCHAR(max),
    [session_state] NVARCHAR(255),
    [refresh_token_expires_in] INT,
    [createdAt] DATETIME NOT NULL CONSTRAINT [Account_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME NOT NULL,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_provider_account_id_key] UNIQUE NONCLUSTERED ([provider],[provider_account_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Account_user_id_idx] ON [dbo].[Account]([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
