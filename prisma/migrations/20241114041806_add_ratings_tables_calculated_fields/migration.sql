BEGIN TRY

    BEGIN TRAN;

    ALTER TABLE CybersecurityRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (networking + projectManagement + securityTools + operatingSystems + programming +
                             cryptography + cloudSecurity + incidentResponse + dataSecurity + technicalSupport +
                             computationalThinking + apiUsage) / 12.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    ALTER TABLE DataAnalyticsRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (dataAnalysis + sqlProgramming + pythonPackages + dataScience + dataEngineering +
                             tableau + machineLearning + rProgramming + projectManagement + dataVisualization +
                             dataStructures + bigOComplexity + sortingAlgorithms + databases +
                             computationalThinking) / 15.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    ALTER TABLE ITCloudRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (techSupport + activeDirectory + projectManagement + helpDeskSupport + windowsServers +
                             sqlProgramming + computerHardware + operatingSystems + systemAdmin + networkAdmin +
                             virtualization + coreCloudServices + apiUsage + httpResponseCodes +
                             computationalThinking) / 15.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    ALTER TABLE SoftwareDevRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (softwareEngineering + softwareDevelopmentLifecycle + programmingLanguages +
                             dataStructuresAndAlgorithms +
                             softwareArchitecture + versionControl + databaseManagement + devOps + cloudComputing +
                             conceptualSystemsThinking + problemSolving + fundamentalCodingConcepts + debugging +
                             computationalThinking + softwareOptimization) / 15.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    ALTER TABLE DurableSkillsRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (emotionManagement + empathy + goalSetting + timeManagement + adaptability +
                             criticalThinking + creativity + resilience + communication + activeListening +
                             conflictResolution + nonverbalCommunication + teamwork + trustBuilding +
                             leadership + perspectiveTaking + culturalAwareness + relationshipBuilding +
                             documentationSkills) / 19.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    ALTER TABLE BrandingRating
        ADD overallAverage AS (
            CAST(
                    ROUND(
                            (personalBrand + onlinePresence + elevatorPitch + resumeEffectiveness +
                             coverLetterEffectiveness + interviewExperience + responseTechnique +
                             followUpImportance + onlineNetworking + eventNetworking +
                             relationshipManagement + jobSearchStrategy + materialDistribution +
                             networkingTechniques + onboardingBestPractices + developmentPlan +
                             mentorship) / 17.0, 2
                    ) AS DECIMAL(3, 2)
            )
            );

    COMMIT TRAN;

END TRY
BEGIN CATCH

    IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN;
        END;
    THROW;

END CATCH;
