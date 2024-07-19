/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Account] DROP CONSTRAINT [Account_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Skill] DROP CONSTRAINT [FK_subcategory_id];

-- DropTable
DROP TABLE [dbo].[Account];

-- DropTable
DROP TABLE [dbo].[Skill];

-- DropTable
DROP TABLE [dbo].[Subcategory];

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[case_mgmt] (
    [idcase_mgmt] INT NOT NULL,
    [jobseeker_learner_id] NVARCHAR(36) NOT NULL,
    [cfa_admin_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [case_mgmt_PRIMARY] PRIMARY KEY NONCLUSTERED ([idcase_mgmt])
);

-- CreateTable
CREATE TABLE [dbo].[certificates] (
    [certification_id] INT NOT NULL,
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [issuing_org] VARCHAR(255) NOT NULL,
    [credential_id] VARCHAR(255) NOT NULL,
    [credential_url] VARCHAR(255),
    [issue_date] DATETIME NOT NULL,
    [expiration_date] VARCHAR(45) NOT NULL,
    CONSTRAINT [certificates_PRIMARY] PRIMARY KEY NONCLUSTERED ([certification_id])
);

-- CreateTable
CREATE TABLE [dbo].[cfa_admin] (
    [admin_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [cfa_admin_PRIMARY] PRIMARY KEY NONCLUSTERED ([admin_id])
);

-- CreateTable
CREATE TABLE [dbo].[companies] (
    [company_id] NVARCHAR(36) NOT NULL,
    [industry_sector_id] VARCHAR(36) NOT NULL,
    [company_name] VARCHAR(255) NOT NULL,
    [company_logo_url] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255) NOT NULL,
    [company_email] VARCHAR(255) NOT NULL,
    [year_founded] INT NOT NULL,
    [company_website_url] VARCHAR(255) NOT NULL,
    [company_video_url] VARCHAR(255),
    [company_phone] VARCHAR(15),
    [company_mission] VARCHAR(255),
    [company_vision] VARCHAR(255),
    [size] VARCHAR(45) NOT NULL CONSTRAINT [DF__companies__size__3F466844] DEFAULT 'less than 25',
    [predicted_annual_hires] INT,
    CONSTRAINT [companies_PRIMARY] PRIMARY KEY NONCLUSTERED ([company_id])
);

-- CreateTable
CREATE TABLE [dbo].[company_addresses] (
    [company_address_id] VARCHAR(36) NOT NULL,
    [company_id] NVARCHAR(36) NOT NULL,
    [city] VARCHAR(255) NOT NULL,
    [state] VARCHAR(255) NOT NULL,
    [zip_region] INT,
    [county] VARCHAR(255) NOT NULL,
    CONSTRAINT [company_addresses_PRIMARY] PRIMARY KEY NONCLUSTERED ([company_address_id])
);

-- CreateTable
CREATE TABLE [dbo].[company_social_links] (
    [social_media_id] VARCHAR(36) NOT NULL,
    [company_id] NVARCHAR(36) NOT NULL,
    [social_platform_id] INT NOT NULL,
    [social_url] VARCHAR(45) NOT NULL,
    CONSTRAINT [company_social_links_PRIMARY] PRIMARY KEY NONCLUSTERED ([social_media_id])
);

-- CreateTable
CREATE TABLE [dbo].[company_testimonials] (
    [testimonial_id] NVARCHAR(36) NOT NULL,
    [company_id] NVARCHAR(36) NOT NULL,
    [text] VARCHAR(255) NOT NULL,
    [author] VARCHAR(255) NOT NULL,
    CONSTRAINT [company_testimonials_PRIMARY] PRIMARY KEY NONCLUSTERED ([testimonial_id])
);

-- CreateTable
CREATE TABLE [dbo].[contact_addresses] (
    [contract_address_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [zip] INT NOT NULL,
    [state] VARCHAR(255) NOT NULL,
    [city] VARCHAR(255) NOT NULL,
    [county] VARCHAR(255) NOT NULL,
    CONSTRAINT [contact_addresses_PRIMARY] PRIMARY KEY NONCLUSTERED ([contract_address_id])
);

-- CreateTable
CREATE TABLE [dbo].[contacts] (
    [user_id] NVARCHAR(36) NOT NULL,
    [user_name] VARCHAR(255) NOT NULL,
    [first_name] VARCHAR(255) NOT NULL,
    [last_name] VARCHAR(255) NOT NULL,
    [birthdate] DATETIME NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [phone] VARCHAR(15),
    [gender] VARCHAR(45),
    [race] VARCHAR(45),
    [photo_url] VARCHAR(255),
    CONSTRAINT [contacts_PRIMARY] PRIMARY KEY NONCLUSTERED ([user_id]),
    CONSTRAINT [contacts_user_id_UNIQUE] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[edu_addresses] (
    [edu_address_id] VARCHAR(36) NOT NULL,
    [edu_institution_id] NVARCHAR(36) NOT NULL,
    [street1] VARCHAR(255) NOT NULL,
    [street2] VARCHAR(255),
    [city] VARCHAR(255) NOT NULL,
    [state] VARCHAR(255) NOT NULL,
    [zip] INT NOT NULL,
    CONSTRAINT [edu_addresses_PRIMARY] PRIMARY KEY NONCLUSTERED ([edu_address_id])
);

-- CreateTable
CREATE TABLE [dbo].[edu_institutions] (
    [edu_institution_id] NVARCHAR(36) NOT NULL,
    [name] VARCHAR(255),
    [contact_email] VARCHAR(255) NOT NULL,
    [edu_url] VARCHAR(255) NOT NULL,
    CONSTRAINT [edu_institutions_PRIMARY] PRIMARY KEY NONCLUSTERED ([edu_institution_id]),
    CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE] UNIQUE NONCLUSTERED ([edu_institution_id])
);

-- CreateTable
CREATE TABLE [dbo].[educators] (
    [educator_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [edu_institution_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [educators_PRIMARY] PRIMARY KEY NONCLUSTERED ([educator_id])
);

-- CreateTable
CREATE TABLE [dbo].[employers] (
    [employer_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [company_id] NVARCHAR(36) NOT NULL,
    [job_title] VARCHAR(255) NOT NULL,
    [home_office_location] VARCHAR(255),
    [employer_url] VARCHAR(255),
    [logo_url] VARCHAR(255),
    CONSTRAINT [employers_PRIMARY] PRIMARY KEY NONCLUSTERED ([employer_id]),
    CONSTRAINT [employers_employer_id_UNIQUE] UNIQUE NONCLUSTERED ([employer_id])
);

-- CreateTable
CREATE TABLE [dbo].[industry_sectors] (
    [industry_sector_id] VARCHAR(36) NOT NULL,
    [sector_title] VARCHAR(255) NOT NULL,
    CONSTRAINT [industry_sectors_PRIMARY] PRIMARY KEY NONCLUSTERED ([industry_sector_id])
);

-- CreateTable
CREATE TABLE [dbo].[job_listing_has_skills] (
    [job_listing_has_skill_id] NVARCHAR(36) NOT NULL,
    [job_listing_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [job_listing_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([job_listing_has_skill_id]),
    CONSTRAINT [job_listing_has_skills_job_listing_has_skill_category_id_UNIQUE] UNIQUE NONCLUSTERED ([job_listing_has_skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[job_postings] (
    [job_posting_id] NVARCHAR(36) NOT NULL,
    [company_id] NVARCHAR(36) NOT NULL,
    [employer_id] NVARCHAR(36) NOT NULL,
    [technolody_area_id] NVARCHAR(36) NOT NULL,
    [job_title] VARCHAR(255) NOT NULL,
    [job_description] VARCHAR(255) NOT NULL,
    [is_internship] SMALLINT NOT NULL CONSTRAINT [DF__job_posti__is_in__571DF1D5] DEFAULT 0,
    [is_paid] SMALLINT NOT NULL CONSTRAINT [DF__job_posti__is_pa__5812160E] DEFAULT 1,
    [employment_type] NVARCHAR(255) NOT NULL CONSTRAINT [DF__job_posti__emplo__59063A47] DEFAULT 'N''full-time''',
    [location] NVARCHAR(255) NOT NULL,
    [salary_range] VARCHAR(45) NOT NULL,
    [county] VARCHAR(255) NOT NULL,
    [zip] VARCHAR(45) NOT NULL,
    [publish_date] DATETIME NOT NULL,
    [unpublish_date] DATETIME NOT NULL,
    [job_post_url] VARCHAR(255),
    [assessment_url] VARCHAR(255),
    CONSTRAINT [job_postings_PRIMARY] PRIMARY KEY NONCLUSTERED ([job_posting_id]),
    CONSTRAINT [job_postings_job_listing_id_UNIQUE] UNIQUE NONCLUSTERED ([job_posting_id])
);

-- CreateTable
CREATE TABLE [dbo].[jobseeker_has_skills] (
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [jobseeker_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseeker_id],[skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[jobseekers] (
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [targeted_pathway] NVARCHAR(36) NOT NULL,
    [edu_institution_id] NVARCHAR(36),
    [is_enrolled_college] SMALLINT,
    [highest_level_of_study_completed] VARCHAR(255),
    [current_grade_level] VARCHAR(45),
    [current_enrolled_ed_program] VARCHAR(255),
    [degree_type] VARCHAR(45),
    [intern_hours_required] SMALLINT NOT NULL CONSTRAINT [DF__jobseeker__inter__6383C8BA] DEFAULT 0,
    [major] VARCHAR(45),
    [minor] VARCHAR(45),
    [intro_headline] VARCHAR(255),
    [current_job_title] VARCHAR(255),
    [resume_url] VARCHAR(255),
    [years_work_exp] SMALLINT,
    [portfolio_url] VARCHAR(255),
    [video_url] VARCHAR(255),
    [employment_type_sought] NVARCHAR(255) CONSTRAINT [DF__jobseeker__emplo__6477ECF3] DEFAULT 'N''any''',
    CONSTRAINT [jobseekers_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseeker_id]),
    CONSTRAINT [jobseekers_learner_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_id])
);

-- CreateTable
CREATE TABLE [dbo].[jobseekers_private_data] (
    [jobseeker_private_data_id] NVARCHAR(36) NOT NULL,
    [learner_id] NVARCHAR(36) NOT NULL,
    [ssn] VARCHAR(255),
    [is_authorized_to_work_in_usa] SMALLINT NOT NULL CONSTRAINT [DF__jobseeker__is_au__3C34F16F] DEFAULT 0,
    [job_sponsorship_required] SMALLINT NOT NULL CONSTRAINT [DF__jobseeker__job_s__3D2915A8] DEFAULT 0,
    [is_veteran] SMALLINT NOT NULL CONSTRAINT [DF__jobseeker__is_ve__3E1D39E1] DEFAULT 0,
    [has_disability] VARCHAR(45) NOT NULL CONSTRAINT [DF__jobseeker__has_d__3F115E1A] DEFAULT 'prefer not to say',
    CONSTRAINT [jobseekers_private_data_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseeker_private_data_id]),
    CONSTRAINT [jobseekers_private_data_learner_private_data_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_private_data_id])
);

-- CreateTable
CREATE TABLE [dbo].[jobseekers_skill_gap_data] (
    [jobseeker_skill_gap_data_id] NVARCHAR(36) NOT NULL,
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [jobseekers_skill_gap_data_PRIMARY] PRIMARY KEY NONCLUSTERED ([jobseeker_skill_gap_data_id]),
    CONSTRAINT [jobseekers_skill_gap_data_learner_skill_gap_data_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_skill_gap_data_id])
);

-- CreateTable
CREATE TABLE [dbo].[learner_proj_based_tech_assessment] (
    [learner_proj_based_tech_assessment_id] NVARCHAR(36) NOT NULL,
    [learner_id] NVARCHAR(36) NOT NULL,
    [proj_based_tech_assessment_id] NVARCHAR(36) NOT NULL,
    [attempt_date] DATETIME NOT NULL,
    [has_passed] SMALLINT NOT NULL,
    CONSTRAINT [learner_proj_based_tech_assessment_PRIMARY] PRIMARY KEY NONCLUSTERED ([learner_proj_based_tech_assessment_id]),
    CONSTRAINT [learner_proj_based_tech_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([learner_proj_based_tech_assessment_id])
);

-- CreateTable
CREATE TABLE [dbo].[pathway_has_skills] (
    [pathway_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [pathway_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([pathway_id],[skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[pathway_subcategories] (
    [pathway_subcategory_id] NVARCHAR(36) NOT NULL,
    [pathway_id] NVARCHAR(36) NOT NULL,
    [pw_subcategory_name] VARCHAR(45) NOT NULL,
    [subcategory_assessment_url] VARCHAR(255),
    CONSTRAINT [pathway_subcategories_PRIMARY] PRIMARY KEY NONCLUSTERED ([pathway_subcategory_id],[pathway_id])
);

-- CreateTable
CREATE TABLE [dbo].[pathways] (
    [pathway_id] NVARCHAR(36) NOT NULL,
    [pathway_title] VARCHAR(255) NOT NULL,
    CONSTRAINT [pathways_PRIMARY] PRIMARY KEY NONCLUSTERED ([pathway_id])
);

-- CreateTable
CREATE TABLE [dbo].[proj_based_tech_assessments] (
    [proj_based_tech_assessment_id] NVARCHAR(36) NOT NULL,
    [url] VARCHAR(255) NOT NULL,
    [title] VARCHAR(255) NOT NULL,
    [pathway_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [proj_based_tech_assessments_PRIMARY] PRIMARY KEY NONCLUSTERED ([proj_based_tech_assessment_id]),
    CONSTRAINT [proj_based_tech_assessments_proj_based_tech_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([proj_based_tech_assessment_id])
);

-- CreateTable
CREATE TABLE [dbo].[project_experiences] (
    [proj_xp_id] NVARCHAR(36) NOT NULL,
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [project_title] VARCHAR(255) NOT NULL,
    [jobseeker_role] VARCHAR(255) NOT NULL,
    [start_date] DATETIME NOT NULL,
    [completion_date] DATETIME NOT NULL,
    [problem_solved_description] NVARCHAR(max) NOT NULL,
    [team_size] SMALLINT NOT NULL,
    [repo_url] VARCHAR(255),
    [demo_url] VARCHAR(255),
    CONSTRAINT [project_experiences_PRIMARY] PRIMARY KEY NONCLUSTERED ([proj_xp_id])
);

-- CreateTable
CREATE TABLE [dbo].[project_has_skills] (
    [proj_exp_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [project_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([proj_exp_id],[skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[sa_possible_answers] (
    [sa_possible_answer_id] NVARCHAR(36) NOT NULL,
    [sa_question_id] NVARCHAR(36) NOT NULL,
    [answer_text] VARCHAR(255),
    [is_correct] SMALLINT NOT NULL CONSTRAINT [DF__sa_possib__is_co__1332DBDC] DEFAULT 0,
    CONSTRAINT [sa_possible_answers_PRIMARY] PRIMARY KEY NONCLUSTERED ([sa_possible_answer_id]),
    CONSTRAINT [sa_possible_answers_sa_possible_answer_id_UNIQUE] UNIQUE NONCLUSTERED ([sa_possible_answer_id])
);

-- CreateTable
CREATE TABLE [dbo].[sa_questions] (
    [sa_question_id] NVARCHAR(36) NOT NULL,
    [self_assessment_id] NVARCHAR(36) NOT NULL,
    [question_topic] NVARCHAR(255) NOT NULL,
    [question_type] NVARCHAR(255) NOT NULL,
    [text] VARCHAR(255) NOT NULL,
    [option_count] INT,
    CONSTRAINT [sa_questions_PRIMARY] PRIMARY KEY NONCLUSTERED ([sa_question_id]),
    CONSTRAINT [sa_questions_sa_question_id_UNIQUE] UNIQUE NONCLUSTERED ([sa_question_id])
);

-- CreateTable
CREATE TABLE [dbo].[self_assessments] (
    [self_assessment_id] NVARCHAR(36) NOT NULL,
    [pathway_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [self_assessments_PRIMARY] PRIMARY KEY NONCLUSTERED ([self_assessment_id]),
    CONSTRAINT [self_assessments_self_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([self_assessment_id])
);

-- CreateTable
CREATE TABLE [dbo].[skill_subcategories] (
    [skill_subcategory_id] NVARCHAR(36) NOT NULL,
    [subcategory_name] VARCHAR(255) NOT NULL,
    [subcategory_description] VARCHAR(255) NOT NULL,
    CONSTRAINT [skill_subcategories_PRIMARY] PRIMARY KEY NONCLUSTERED ([skill_subcategory_id]),
    CONSTRAINT [skill_subcategories_skill_category_id_UNIQUE] UNIQUE NONCLUSTERED ([skill_subcategory_id])
);

-- CreateTable
CREATE TABLE [dbo].[skills] (
    [skill_id] NVARCHAR(36) NOT NULL,
    [skill_subcategory_id] NVARCHAR(36) NOT NULL,
    [skill_name] VARCHAR(45) NOT NULL,
    [skill_description] VARCHAR(45) NOT NULL,
    CONSTRAINT [skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([skill_id]),
    CONSTRAINT [skills_skill_id_UNIQUE] UNIQUE NONCLUSTERED ([skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[social_media_platforms] (
    [social_platform_id] INT NOT NULL,
    [platform] VARCHAR(45) NOT NULL,
    [social_logo] VARBINARY(max) NOT NULL,
    CONSTRAINT [social_media_platforms_PRIMARY] PRIMARY KEY NONCLUSTERED ([social_platform_id])
);

-- CreateTable
CREATE TABLE [dbo].[technology_areas] (
    [technolody_area_id] NVARCHAR(36) NOT NULL,
    [title] VARCHAR(255) NOT NULL,
    CONSTRAINT [technology_areas_PRIMARY] PRIMARY KEY NONCLUSTERED ([technolody_area_id])
);

-- CreateTable
CREATE TABLE [dbo].[timestamps] (
    [create_time] DATETIME CONSTRAINT [DF__timestamp__creat__2739D489] DEFAULT CURRENT_TIMESTAMP,
    [update_time] DATETIME
);

-- CreateTable
CREATE TABLE [dbo].[training_program_has_skills] (
    [training_program_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [training_program_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([training_program_id],[skill_id])
);

-- CreateTable
CREATE TABLE [dbo].[training_programs] (
    [training_program_id] NVARCHAR(36) NOT NULL,
    [training_provider_id] NVARCHAR(36) NOT NULL,
    [pathway_id] NVARCHAR(36),
    CONSTRAINT [training_programs_PRIMARY] PRIMARY KEY NONCLUSTERED ([training_program_id]),
    CONSTRAINT [training_programs_training_program_id_UNIQUE] UNIQUE NONCLUSTERED ([training_program_id])
);

-- CreateTable
CREATE TABLE [dbo].[training_providers] (
    [training_provider_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [edu_institution_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [training_providers_PRIMARY] PRIMARY KEY NONCLUSTERED ([training_provider_id]),
    CONSTRAINT [training_providers_training_provider_id_UNIQUE] UNIQUE NONCLUSTERED ([training_provider_id])
);

-- CreateTable
CREATE TABLE [dbo].[volunteer_has_skills] (
    [volunteer_skills_id] NVARCHAR(36) NOT NULL,
    [volunteer_id] NVARCHAR(36) NOT NULL,
    [skill_id] NVARCHAR(36) NOT NULL,
    CONSTRAINT [volunteer_has_skills_PRIMARY] PRIMARY KEY NONCLUSTERED ([volunteer_skills_id])
);

-- CreateTable
CREATE TABLE [dbo].[volunteers] (
    [volunteer_id] NVARCHAR(36) NOT NULL,
    [user_id] NVARCHAR(36) NOT NULL,
    [volunteer_type] NVARCHAR(255) NOT NULL,
    CONSTRAINT [volunteers_PRIMARY] PRIMARY KEY NONCLUSTERED ([volunteer_id]),
    CONSTRAINT [volunteers_mentor_id_UNIQUE] UNIQUE NONCLUSTERED ([volunteer_id])
);

-- CreateTable
CREATE TABLE [dbo].[work_experiences] (
    [work_id] NVARCHAR(36) NOT NULL,
    [jobseeker_id] NVARCHAR(36) NOT NULL,
    [technolody_area_id] NVARCHAR(36) NOT NULL,
    [company] VARCHAR(255) NOT NULL,
    [is_internship] SMALLINT NOT NULL CONSTRAINT [DF__work_expe__is_in__75A278F5] DEFAULT 0,
    [job_title] VARCHAR(45) NOT NULL,
    [is_current_job] SMALLINT NOT NULL CONSTRAINT [DF__work_expe__is_cu__76969D2E] DEFAULT 0,
    [start_date] DATETIME NOT NULL,
    [end_date] DATETIME,
    [responsibilities] NVARCHAR(max) NOT NULL,
    CONSTRAINT [work_experiences_PRIMARY] PRIMARY KEY NONCLUSTERED ([work_id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[case_mgmt]([cfa_admin_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[case_mgmt]([jobseeker_learner_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_certificates_jobseeker1_idx] ON [dbo].[certificates]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cfa_admin_fk_admin_contacts1_idx] ON [dbo].[cfa_admin]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [companies_fk_company_industry_sectors1_idx] ON [dbo].[companies]([industry_sector_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_addresses_fk_company_address_company1_idx] ON [dbo].[company_addresses]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_social_links_fk_social_media_company_company1_idx] ON [dbo].[company_social_links]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_social_links_fk_social_media_company_social_media_platform1_idx] ON [dbo].[company_social_links]([social_platform_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_company_testimonials_company1_idx] ON [dbo].[company_testimonials]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [contact_addresses_fk_address_contacts1_idx] ON [dbo].[contact_addresses]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [edu_addresses_fk_edu_address_edu_institution1_idx] ON [dbo].[edu_addresses]([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_educators_contacts1_idx] ON [dbo].[educators]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_educators_edu_institution1_idx] ON [dbo].[educators]([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [employers_fk_employer_user1_idx] ON [dbo].[employers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_employers_company1_idx] ON [dbo].[employers]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_job_listing1_idx] ON [dbo].[job_listing_has_skills]([job_listing_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_skill1_idx] ON [dbo].[job_listing_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_companies1_idx] ON [dbo].[job_postings]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_employers1_idx] ON [dbo].[job_postings]([employer_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings]([technolody_area_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_jobseeker1_idx] ON [dbo].[jobseeker_has_skills]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_skill1_idx] ON [dbo].[jobseeker_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_fk_jobseeker_Pathways1_idx] ON [dbo].[jobseekers]([targeted_pathway]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_fk_learner_edu_institution1_idx] ON [dbo].[jobseekers]([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_fk_learner_user1_idx] ON [dbo].[jobseekers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_private_data_fk_user_learner_private_data_user1] ON [dbo].[jobseekers_private_data]([learner_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_skill_gap_data_fk_learner_skill_gap_data_learner1] ON [dbo].[jobseekers_skill_gap_data]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_proj_based_tech_as_idx] ON [dbo].[learner_proj_based_tech_assessment]([proj_based_tech_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_user1_idx] ON [dbo].[learner_proj_based_tech_assessment]([learner_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pathway_has_skills_fk_Pathways_has_skill_Pathways1_idx] ON [dbo].[pathway_has_skills]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pathway_has_skills_fk_Pathways_has_skill_skill1_idx] ON [dbo].[pathway_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_pathway_subcategories_pathways1_idx] ON [dbo].[pathway_subcategories]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_proj_based_tech_assessments_Pathways1_idx] ON [dbo].[proj_based_tech_assessments]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_experiences_fk_project_experience_jobseeker1_idx] ON [dbo].[project_experiences]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_has_skills_fk_project_experience_has_skill_project_experience1_idx] ON [dbo].[project_has_skills]([proj_exp_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_has_skills_fk_project_experience_has_skill_skill1_idx] ON [dbo].[project_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [sa_possible_answers_fk_sa_possible_answer_sa_question1_idx] ON [dbo].[sa_possible_answers]([sa_question_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [sa_questions_fk_sa_question_self_assessment1_idx] ON [dbo].[sa_questions]([self_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_self_assessments_Pathways1_idx] ON [dbo].[self_assessments]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [skills_fk_skill_skill_category_idx] ON [dbo].[skills]([skill_subcategory_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_skills1_idx] ON [dbo].[training_program_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_training_program1_idx] ON [dbo].[training_program_has_skills]([training_program_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_Pathways1_idx] ON [dbo].[training_programs]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[training_programs]([training_provider_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_providers_fk_training_provider_edu_institution1_idx] ON [dbo].[training_providers]([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_providers_fk_training_provider_user1_idx] ON [dbo].[training_providers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteer_has_skills_fk_volunteer_has_skill_skill1_idx] ON [dbo].[volunteer_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteer_has_skills_fk_volunteer_has_skill_volunteer1_idx] ON [dbo].[volunteer_has_skills]([volunteer_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteers_fk_mentor_user1_idx] ON [dbo].[volunteers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences]([technolody_area_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [work_experiences_fk_work_experience_jobseeker1_idx] ON [dbo].[work_experiences]([jobseeker_id]);

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_admin1] FOREIGN KEY ([cfa_admin_id]) REFERENCES [dbo].[cfa_admin]([admin_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_jobseeker1] FOREIGN KEY ([jobseeker_learner_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[certificates] ADD CONSTRAINT [fk_certificates_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[companies] ADD CONSTRAINT [fk_company_industry_sectors1] FOREIGN KEY ([industry_sector_id]) REFERENCES [dbo].[industry_sectors]([industry_sector_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT [fk_company_address_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_company_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_company_social_media_platform1] FOREIGN KEY ([social_platform_id]) REFERENCES [dbo].[social_media_platforms]([social_platform_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_testimonials] ADD CONSTRAINT [fk_company_testimonials_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[contact_addresses] ADD CONSTRAINT [fk_address_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employer_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employers_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT [fk_job_listing_has_skill_category_job_listing1] FOREIGN KEY ([job_listing_id]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT [fk_job_listing_has_skill_category_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_companies1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_employers1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_technology_areas1] FOREIGN KEY ([technolody_area_id]) REFERENCES [dbo].[technology_areas]([technolody_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT [fk_jobseeker_has_skill_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT [fk_jobseeker_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_jobseeker_Pathways1] FOREIGN KEY ([targeted_pathway]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_learner_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_learner_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [fk_user_learner_private_data_user1] FOREIGN KEY ([learner_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ADD CONSTRAINT [fk_learner_skill_gap_data_learner1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [fk_user_has_proj_based_tech_assessment_proj_based_tech_asse1] FOREIGN KEY ([proj_based_tech_assessment_id]) REFERENCES [dbo].[proj_based_tech_assessments]([proj_based_tech_assessment_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1] FOREIGN KEY ([learner_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pathway_has_skills] ADD CONSTRAINT [fk_Pathways_has_skill_Pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pathway_has_skills] ADD CONSTRAINT [fk_Pathways_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pathway_subcategories] ADD CONSTRAINT [fk_pathway_subcategories_pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[proj_based_tech_assessments] ADD CONSTRAINT [fk_proj_based_tech_assessments_Pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [fk_project_experience_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT [fk_project_experience_has_skill_project_experience1] FOREIGN KEY ([proj_exp_id]) REFERENCES [dbo].[project_experiences]([proj_xp_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT [fk_project_experience_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sa_possible_answers] ADD CONSTRAINT [fk_sa_possilbe_answer_sa_question1] FOREIGN KEY ([sa_question_id]) REFERENCES [dbo].[sa_questions]([sa_question_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sa_questions] ADD CONSTRAINT [fk_sa_question_self_assessment] FOREIGN KEY ([self_assessment_id]) REFERENCES [dbo].[self_assessments]([self_assessment_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[self_assessments] ADD CONSTRAINT [fk_self_assessments_Pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[skills] ADD CONSTRAINT [fk_skill_skill_category] FOREIGN KEY ([skill_subcategory_id]) REFERENCES [dbo].[skill_subcategories]([skill_subcategory_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_program_has_skills] ADD CONSTRAINT [fk_training_program_has_skills_skills1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_program_has_skills] ADD CONSTRAINT [fk_training_program_has_skills_training_program1] FOREIGN KEY ([training_program_id]) REFERENCES [dbo].[training_programs]([training_program_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_programs] ADD CONSTRAINT [fk_training_program_Pathways1] FOREIGN KEY ([pathway_id]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_programs] ADD CONSTRAINT [fk_training_program_training_provider1] FOREIGN KEY ([training_provider_id]) REFERENCES [dbo].[training_providers]([training_provider_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] ADD CONSTRAINT [fk_volunteer_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] ADD CONSTRAINT [fk_volunteer_has_skill_volunteer1] FOREIGN KEY ([volunteer_id]) REFERENCES [dbo].[volunteers]([volunteer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT [fk_mentor_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[contacts]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experience_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_technology_areas1] FOREIGN KEY ([technolody_area_id]) REFERENCES [dbo].[technology_areas]([technolody_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
