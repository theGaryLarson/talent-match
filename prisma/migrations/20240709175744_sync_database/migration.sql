BEGIN TRY

BEGIN TRAN;

-- Drop existing default constraint if it exists and add new default constraint for case_mgmt
DECLARE @defaultCaseMgmtId NVARCHAR(200);
SELECT @defaultCaseMgmtId = name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('dbo.case_mgmt')
  AND parent_column_id = (SELECT column_id FROM sys.columns
                          WHERE object_id = OBJECT_ID('dbo.case_mgmt')
                            AND name = 'case_mgmt_id');
IF @defaultCaseMgmtId IS NOT NULL
BEGIN
EXEC('ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT ' + @defaultCaseMgmtId);
END
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id];

-- Alter expiration_date column on certificates table
ALTER TABLE [dbo].[certificates] ALTER COLUMN [expiration_date] DATETIME NOT NULL;

-- Drop existing default constraint if it exists and add new default constraint for project_experiences
DECLARE @defaultProjExpId NVARCHAR(200);
SELECT @defaultProjExpId = name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('dbo.project_experiences')
  AND parent_column_id = (SELECT column_id FROM sys.columns
                          WHERE object_id = OBJECT_ID('dbo.project_experiences')
                            AND name = 'proj_exp_id');
IF @defaultProjExpId IS NOT NULL
BEGIN
EXEC('ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT ' + @defaultProjExpId);
END
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id];

-- Drop existing default constraint if it exists and add new default constraint for skill_subcategories
DECLARE @defaultSkillSubCatId NVARCHAR(200);
SELECT @defaultSkillSubCatId = name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('dbo.skill_subcategories')
  AND parent_column_id = (SELECT column_id FROM sys.columns
                          WHERE object_id = OBJECT_ID('dbo.skill_subcategories')
                            AND name = 'skill_subcategory_id');
IF @defaultSkillSubCatId IS NOT NULL
BEGIN
EXEC('ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT ' + @defaultSkillSubCatId);
END
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- Drop existing default constraint if it exists and add new default constraint for skills
DECLARE @defaultSkillInfoUrl NVARCHAR(200);
SELECT @defaultSkillInfoUrl = name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('dbo.skills')
  AND parent_column_id = (SELECT column_id FROM sys.columns
                          WHERE object_id = OBJECT_ID('dbo.skills')
                            AND name = 'skill_info_url');
IF @defaultSkillInfoUrl IS NOT NULL
BEGIN
EXEC('ALTER TABLE [dbo].[skills] DROP CONSTRAINT ' + @defaultSkillInfoUrl);
END
ALTER TABLE [dbo].[skills] ADD CONSTRAINT [skills_skill_info_url_df] DEFAULT '' FOR [skill_info_url];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
ROLLBACK TRAN;
END;
THROW

END CATCH
