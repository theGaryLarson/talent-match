BEGIN TRANSACTION;

-- 1) “Unspecified” subcategory GUID
DECLARE @UnspecifiedSubCatID UNIQUEIDENTIFIER = '0B9A8D5B-EDB0-4C2F-95CA-14C0A1983DE5';
--     (SELECT skill_subcategory_id
--      FROM dbo.skill_subcategories
--      WHERE LOWER(subcategory_name) = 'unspecified');

--------------------------------------------------------------------------------
-- 2) Upsert skills: split all principalSkills → insert only those NOT already in dbo.skills
--------------------------------------------------------------------------------
;WITH AllSkills AS (
    SELECT DISTINCT
        LTRIM(RTRIM(s.value)) AS skill_name
    FROM dbo.JobRole AS jr
             CROSS APPLY STRING_SPLIT(
            CAST(jr.principalSkills AS VARCHAR(MAX)),
            '~'
                         ) AS s
    WHERE jr.principalSkills IS NOT NULL
)
 INSERT INTO dbo.skills (skill_id, skill_subcategory_id, skill_name, skill_info_url)
 SELECT
     NEWID(),
     @UnspecifiedSubCatID,
     askill.skill_name,
     ''
 FROM AllSkills AS askill
          LEFT JOIN dbo.skills AS sk
                    ON LOWER(sk.skill_name) = LOWER(askill.skill_name)
 WHERE sk.skill_id IS NULL;

--------------------------------------------------------------------------------
-- 3) Populate JobRoleSkill: link each role → skill, skip existing links
--------------------------------------------------------------------------------
;WITH RoleSkills AS (
    SELECT
        jr.id                   AS jobRoleId,
        LTRIM(RTRIM(s.value))   AS skill_name
    FROM dbo.JobRole AS jr
             CROSS APPLY STRING_SPLIT(
            CAST(jr.principalSkills AS VARCHAR(MAX)),
            '~'
                         ) AS s
    WHERE jr.principalSkills IS NOT NULL
)
 INSERT INTO dbo.JobRoleSkill
 (id, jobRoleId, skillId, aiImpact, currentProficiency, futureRelevance, trainingRequired)
 SELECT
     NEWID(),
     rs.jobRoleId,
     sk.skill_id,
     '',     -- aiImpact
     '',     -- currentProficiency
     '',     -- futureRelevance
     0       -- trainingRequired
 FROM RoleSkills AS rs
          JOIN dbo.skills AS sk
               ON LOWER(sk.skill_name) = LOWER(rs.skill_name)
          LEFT JOIN dbo.JobRoleSkill AS jrs
                    ON jrs.jobRoleId = rs.jobRoleId
                        AND jrs.skillId   = sk.skill_id
 WHERE jrs.id IS NULL;

COMMIT;
