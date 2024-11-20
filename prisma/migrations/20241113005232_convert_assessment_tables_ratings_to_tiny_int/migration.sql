/*
  Warnings:

  - You are about to alter the column `personalBrand` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `onlinePresence` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `elevatorPitch` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `resumeEffectiveness` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `coverLetterEffectiveness` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `interviewExperience` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `responseTechnique` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `followUpImportance` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `onlineNetworking` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `eventNetworking` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `relationshipManagement` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `jobSearchStrategy` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `materialDistribution` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `networkingTechniques` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `onboardingBestPractices` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `developmentPlan` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `mentorship` on the `BrandingRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `networking` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `projectManagement` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `securityTools` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `operatingSystems` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `programming` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `cryptography` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `cloudSecurity` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `incidentResponse` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataSecurity` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `computationalThinking` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `apiUsage` on the `CybersecurityRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataAnalysis` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `sqlProgramming` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `pythonPackages` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataScience` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataEngineering` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `tableau` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `machineLearning` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `rProgramming` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `projectManagement` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataVisualization` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataStructures` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `bigOComplexity` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `sortingAlgorithms` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `databases` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `computationalThinking` on the `DataAnalyticsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `emotionManagement` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `empathy` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `goalSetting` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `timeManagement` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `adaptability` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `criticalThinking` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `creativity` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `resilience` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `communication` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `activeListening` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `conflictResolution` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `nonverbalCommunication` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `teamwork` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `trustBuilding` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `leadership` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `perspectiveTaking` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `culturalAwareness` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `relationshipBuilding` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `documentationSkills` on the `DurableSkillsRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `techSupport` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `activeDirectory` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `projectManagement` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `helpDeskSupport` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `windowsServers` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `sqlProgramming` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `computerHardware` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `operatingSystems` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `systemAdmin` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `networkAdmin` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `virtualization` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `coreCloudServices` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `apiUsage` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `httpResponseCodes` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `computationalThinking` on the `ITCloudRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `softwareEngineering` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `softwareDevelopmentLifecycle` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `programmingLanguages` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `dataStructuresAndAlgorithms` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `softwareArchitecture` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `versionControl` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `databaseManagement` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `devOps` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `cloudComputing` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `conceptualSystemsThinking` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `problemSolving` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `fundamentalCodingConcepts` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `debugging` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `computationalThinking` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to alter the column `softwareOptimization` on the `SoftwareDevRating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [personalBrand] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [onlinePresence] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [elevatorPitch] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [resumeEffectiveness] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [coverLetterEffectiveness] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [interviewExperience] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [responseTechnique] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [followUpImportance] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [onlineNetworking] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [eventNetworking] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [relationshipManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [jobSearchStrategy] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [materialDistribution] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [networkingTechniques] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [onboardingBestPractices] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [developmentPlan] TINYINT NOT NULL;
ALTER TABLE [dbo].[BrandingRating] ALTER COLUMN [mentorship] TINYINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CaseMgmtNotes] DROP CONSTRAINT [CaseMgmtNotes_id_df];
ALTER TABLE [dbo].[CaseMgmtNotes] ADD CONSTRAINT [CaseMgmtNotes_id_df] DEFAULT newid() FOR [id];

-- AlterTable
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [networking] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [projectManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [securityTools] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [operatingSystems] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [programming] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [cryptography] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [cloudSecurity] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [incidentResponse] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [dataSecurity] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [computationalThinking] TINYINT NOT NULL;
ALTER TABLE [dbo].[CybersecurityRating] ALTER COLUMN [apiUsage] TINYINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [dataAnalysis] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [sqlProgramming] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [pythonPackages] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [dataScience] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [dataEngineering] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [tableau] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [machineLearning] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [rProgramming] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [projectManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [dataVisualization] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [dataStructures] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [bigOComplexity] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [sortingAlgorithms] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [databases] TINYINT NOT NULL;
ALTER TABLE [dbo].[DataAnalyticsRating] ALTER COLUMN [computationalThinking] TINYINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [emotionManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [empathy] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [goalSetting] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [timeManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [adaptability] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [criticalThinking] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [creativity] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [resilience] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [communication] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [activeListening] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [conflictResolution] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [nonverbalCommunication] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [teamwork] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [trustBuilding] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [leadership] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [perspectiveTaking] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [culturalAwareness] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [relationshipBuilding] TINYINT NOT NULL;
ALTER TABLE [dbo].[DurableSkillsRating] ALTER COLUMN [documentationSkills] TINYINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [techSupport] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [activeDirectory] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [projectManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [helpDeskSupport] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [windowsServers] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [sqlProgramming] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [computerHardware] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [operatingSystems] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [systemAdmin] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [networkAdmin] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [virtualization] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [coreCloudServices] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [apiUsage] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [httpResponseCodes] TINYINT NOT NULL;
ALTER TABLE [dbo].[ITCloudRating] ALTER COLUMN [computationalThinking] TINYINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id];

-- AlterTable
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [softwareEngineering] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [softwareDevelopmentLifecycle] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [programmingLanguages] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [dataStructuresAndAlgorithms] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [softwareArchitecture] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [versionControl] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [databaseManagement] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [devOps] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [cloudComputing] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [conceptualSystemsThinking] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [problemSolving] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [fundamentalCodingConcepts] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [debugging] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [computationalThinking] TINYINT NOT NULL;
ALTER TABLE [dbo].[SoftwareDevRating] ALTER COLUMN [softwareOptimization] TINYINT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
