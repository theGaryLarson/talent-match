BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[JobGroup] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobGroup_id_df] DEFAULT newid(),
    [name] VARCHAR(255) NOT NULL,
    [tooltip] VARCHAR(2083) NOT NULL,
    [description] TEXT NOT NULL,
    CONSTRAINT [JobGroup_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [JobGroup_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Training] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Training_id_df] DEFAULT newid(),
    [title] VARCHAR(255) NOT NULL,
    [url] VARCHAR(2083) NOT NULL,
    [provider] VARCHAR(255),
    [skillsDeveloped] TEXT,
    CONSTRAINT [Training_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JobGroupTraining] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobGroupTraining_id_df] DEFAULT newid(),
    [jobGroupId] UNIQUEIDENTIFIER NOT NULL,
    [trainingId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [JobGroupTraining_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [JobGroupTraining_jobGroupId_trainingId_key] UNIQUE NONCLUSTERED ([jobGroupId],[trainingId])
);

-- CreateTable
CREATE TABLE [dbo].[JobRole] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobRole_id_df] DEFAULT newid(),
    [jobGroupId] UNIQUEIDENTIFIER,
    [title] VARCHAR(255) NOT NULL,
    [jobLevel] VARCHAR(20) NOT NULL,
    [jobDescription] TEXT,
    [principalTasks] TEXT,
    [principalSkills] TEXT,
    [aiImpact] TEXT,
    [keyInsights] TEXT,
    [aiTransformation] TEXT,
    CONSTRAINT [JobRole_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JobRoleTraining] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobRoleTraining_id_df] DEFAULT newid(),
    [jobRoleId] UNIQUEIDENTIFIER NOT NULL,
    [trainingId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [JobRoleTraining_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [JobRoleTraining_jobRoleId_trainingId_key] UNIQUE NONCLUSTERED ([jobRoleId],[trainingId])
);

-- CreateTable
CREATE TABLE [dbo].[JobRoleSkill] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobRoleSkill_id_df] DEFAULT newid(),
    [jobRoleId] UNIQUEIDENTIFIER NOT NULL,
    [skillId] UNIQUEIDENTIFIER NOT NULL,
    [aiImpact] VARCHAR(20) NOT NULL,
    [currentProficiency] VARCHAR(50) NOT NULL,
    [futureRelevance] VARCHAR(50) NOT NULL,
    [trainingRequired] BIT NOT NULL CONSTRAINT [JobRoleSkill_trainingRequired_df] DEFAULT 0,
    CONSTRAINT [JobRoleSkill_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [JobRoleSkill_jobRoleId_skillId_key] UNIQUE NONCLUSTERED ([jobRoleId],[skillId])
);

-- CreateTable
CREATE TABLE [dbo].[_JobGroupTrainings] (
    [A] UNIQUEIDENTIFIER NOT NULL,
    [B] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [_JobGroupTrainings_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_JobGroupTrainings_B_index] ON [dbo].[_JobGroupTrainings]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[JobGroupTraining] ADD CONSTRAINT [JobGroupTraining_jobGroupId_fkey] FOREIGN KEY ([jobGroupId]) REFERENCES [dbo].[JobGroup]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobGroupTraining] ADD CONSTRAINT [JobGroupTraining_trainingId_fkey] FOREIGN KEY ([trainingId]) REFERENCES [dbo].[Training]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobRole] ADD CONSTRAINT [JobRole_jobGroupId_fkey] FOREIGN KEY ([jobGroupId]) REFERENCES [dbo].[JobGroup]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobRoleTraining] ADD CONSTRAINT [JobRoleTraining_jobRoleId_fkey] FOREIGN KEY ([jobRoleId]) REFERENCES [dbo].[JobRole]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobRoleTraining] ADD CONSTRAINT [JobRoleTraining_trainingId_fkey] FOREIGN KEY ([trainingId]) REFERENCES [dbo].[Training]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobRoleSkill] ADD CONSTRAINT [JobRoleSkill_jobRoleId_fkey] FOREIGN KEY ([jobRoleId]) REFERENCES [dbo].[JobRole]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobRoleSkill] ADD CONSTRAINT [JobRoleSkill_skillId_fkey] FOREIGN KEY ([skillId]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_JobGroupTrainings] ADD CONSTRAINT [_JobGroupTrainings_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[JobGroup]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_JobGroupTrainings] ADD CONSTRAINT [_JobGroupTrainings_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Training]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
