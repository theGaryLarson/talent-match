/*
  Warnings:

  - The primary key for the `case_mgmt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_learner_id` on the `case_mgmt` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `cfa_admin_id` on the `case_mgmt` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `case_mgmt_id` on the `case_mgmt` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `certificates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `certification_id` on the `certificates` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `certificates` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `cfa_admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `admin_id` on the `cfa_admin` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `cfa_admin` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `company_id` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `industry_sector_id` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `company_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `company_address_id` on the `company_addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `company_id` on the `company_addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `company_social_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `social_media_id` on the `company_social_links` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `company_id` on the `company_social_links` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `social_platform_id` on the `company_social_links` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `employer_id` on the `company_social_links` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `company_testimonials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `testimonial_id` on the `company_testimonials` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `company_id` on the `company_testimonials` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `employer_id` on the `company_testimonials` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `edu_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `edu_address_id` on the `edu_addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `edu_institution_id` on the `edu_addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `edu_institutions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `edu_institution_id` on the `edu_institutions` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `educators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `educator_id` on the `educators` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `educators` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `edu_institution_id` on the `educators` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `employers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `employer_id` on the `employers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `employers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `company_id` on the `employers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `work_address_id` on the `employers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `industry_sectors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `industry_sector_id` on the `industry_sectors` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `job_listing_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `job_listing_has_skill_id` on the `job_listing_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `job_listing_id` on the `job_listing_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `job_listing_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `job_postings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `job_posting_id` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `company_id` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `employer_id` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `technology_area_id` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `location_id` on the `job_postings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `jobseeker_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_id` on the `jobseeker_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `jobseeker_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `jobseekers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_id` on the `jobseekers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `jobseekers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `targeted_pathway` on the `jobseekers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `jobseekers_education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_ed_id` on the `jobseekers_education` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `jobseekers_education` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `edu_institution_id` on the `jobseekers_education` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `jobseekers_private_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_private_data_id` on the `jobseekers_private_data` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `jobseekers_private_data` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `jobseekers_skill_gap_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_skill_gap_data_id` on the `jobseekers_skill_gap_data` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `jobseekers_skill_gap_data` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `learner_proj_based_tech_assessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `learner_proj_based_tech_assessment_id` on the `learner_proj_based_tech_assessment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `proj_based_tech_assessment_id` on the `learner_proj_based_tech_assessment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `learner_proj_based_tech_assessment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `pathway_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `pathway_id` on the `pathway_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `pathway_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `pathway_subcategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `pathway_subcategory_id` on the `pathway_subcategories` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `pathway_id` on the `pathway_subcategories` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `pathways` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `pathway_id` on the `pathways` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `proj_based_tech_assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `proj_based_tech_assessment_id` on the `proj_based_tech_assessments` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `pathway_id` on the `proj_based_tech_assessments` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `project_experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobseeker_id` on the `project_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `proj_exp_id` on the `project_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `project_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `proj_exp_id` on the `project_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `project_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `sa_possible_answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `sa_possible_answer_id` on the `sa_possible_answers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `sa_question_id` on the `sa_possible_answers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `sa_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `sa_question_id` on the `sa_questions` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `self_assessment_id` on the `sa_questions` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `self_assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `self_assessment_id` on the `self_assessments` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `pathway_id` on the `self_assessments` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `skill_subcategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `skill_subcategory_id` on the `skill_subcategories` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `skill_id` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_subcategory_id` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `social_media_platforms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `social_platform_id` on the `social_media_platforms` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `technology_areas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `technology_area_id` on the `technology_areas` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `training_program_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `training_program_id` on the `training_program_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `training_program_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `training_programs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `training_program_id` on the `training_programs` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `training_provider_id` on the `training_programs` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `pathway_id` on the `training_programs` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `training_providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `training_provider_id` on the `training_providers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `training_providers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `edu_institution_id` on the `training_providers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `user_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `user_addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_address_id` on the `user_addresses` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `volunteer_has_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `volunteer_skills_id` on the `volunteer_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `volunteer_id` on the `volunteer_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `skill_id` on the `volunteer_has_skills` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `volunteers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `volunteer_id` on the `volunteers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `user_id` on the `volunteers` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - The primary key for the `work_experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `work_id` on the `work_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `jobseeker_id` on the `work_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - You are about to alter the column `technology_area_id` on the `work_experiences` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(36)` to `UniqueIdentifier`.
  - A unique constraint covering the columns `[ssn]` on the table `jobseekers_private_data` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_admin1];

-- DropForeignKey
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [fk_case_mgmt_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[certificates] DROP CONSTRAINT [fk_certificates_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[cfa_admin] DROP CONSTRAINT [fk_admin_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[companies] DROP CONSTRAINT [fk_company_industry_sectors1];

-- DropForeignKey
ALTER TABLE [dbo].[company_addresses] DROP CONSTRAINT [fk_company_address_company1];

-- DropForeignKey
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [fk_social_media_company_company1];

-- DropForeignKey
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [fk_social_media_company_social_media_platform1];

-- DropForeignKey
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [fk_social_media_employer_employer1];

-- DropForeignKey
ALTER TABLE [dbo].[company_testimonials] DROP CONSTRAINT [fk_company_testimonals_employer1];

-- DropForeignKey
ALTER TABLE [dbo].[company_testimonials] DROP CONSTRAINT [fk_company_testimonials_company1];

-- DropForeignKey
ALTER TABLE [dbo].[edu_addresses] DROP CONSTRAINT [fk_edu_address_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [fk_educators_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employer_user1];

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employers_company_addresses];

-- DropForeignKey
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [fk_employers_company1];

-- DropForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [fk_job_listing_has_skill_category_job_listing1];

-- DropForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [fk_job_listing_has_skill_category_skill1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_companies1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_company_addresses1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_employers1];

-- DropForeignKey
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [fk_job_postings_technology_areas1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] DROP CONSTRAINT [fk_jobseeker_has_skill_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] DROP CONSTRAINT [fk_jobseeker_has_skill_skill1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [fk_jobseeker_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [fk_learner_user1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [fk_jobseeker_education_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [fk_user_learner_private_data_user1];

-- DropForeignKey
ALTER TABLE [dbo].[jobseekers_skill_gap_data] DROP CONSTRAINT [fk_learner_skill_gap_data_learner1];

-- DropForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [fk_user_has_proj_based_tech_assessment_proj_based_tech_asse1];

-- DropForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1];

-- DropForeignKey
ALTER TABLE [dbo].[pathway_has_skills] DROP CONSTRAINT [fk_Pathways_has_skill_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[pathway_has_skills] DROP CONSTRAINT [fk_Pathways_has_skill_skill1];

-- DropForeignKey
ALTER TABLE [dbo].[pathway_subcategories] DROP CONSTRAINT [fk_pathway_subcategories_pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[proj_based_tech_assessments] DROP CONSTRAINT [fk_proj_based_tech_assessments_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [fk_project_experience_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[project_has_skills] DROP CONSTRAINT [fk_project_experience_has_skill_project_experience1];

-- DropForeignKey
ALTER TABLE [dbo].[project_has_skills] DROP CONSTRAINT [fk_project_experience_has_skill_skill1];

-- DropForeignKey
ALTER TABLE [dbo].[sa_possible_answers] DROP CONSTRAINT [fk_sa_possilbe_answer_sa_question1];

-- DropForeignKey
ALTER TABLE [dbo].[sa_questions] DROP CONSTRAINT [fk_sa_question_self_assessment];

-- DropForeignKey
ALTER TABLE [dbo].[self_assessments] DROP CONSTRAINT [fk_self_assessments_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[skills] DROP CONSTRAINT [fk_skill_skill_category];

-- DropForeignKey
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [fk_training_program_has_skills_skills1];

-- DropForeignKey
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [fk_training_program_has_skills_training_program1];

-- DropForeignKey
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [fk_training_program_Pathways1];

-- DropForeignKey
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [fk_training_program_training_provider1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_edu_institution1];

-- DropForeignKey
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [fk_training_provider_user1];

-- DropForeignKey
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [fk_address_contacts1];

-- DropForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] DROP CONSTRAINT [fk_volunteer_has_skill_skill1];

-- DropForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] DROP CONSTRAINT [fk_volunteer_has_skill_volunteer1];

-- DropForeignKey
ALTER TABLE [dbo].[volunteers] DROP CONSTRAINT [fk_mentor_user1];

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experience_jobseeker1];

-- DropForeignKey
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [fk_work_experiences_technology_areas1];

-- DropIndex
DROP INDEX [fk_case_mgmt_admin1_idx] ON [dbo].[case_mgmt];

-- DropIndex
DROP INDEX [fk_case_mgmt_jobseeker1_idx] ON [dbo].[case_mgmt];

-- DropIndex
DROP INDEX [fk_certificates_jobseeker1_idx] ON [dbo].[certificates];

-- DropIndex
DROP INDEX [cfa_admin_fk_admin_contacts1_idx] ON [dbo].[cfa_admin];

-- DropIndex
DROP INDEX [companies_fk_company_industry_sectors1_idx] ON [dbo].[companies];

-- DropIndex
ALTER TABLE [dbo].[company_addresses] DROP CONSTRAINT [company_addresses_company_id_city_unique];

-- DropIndex
DROP INDEX [company_addresses_fk_company_address_company1_idx] ON [dbo].[company_addresses];

-- DropIndex
DROP INDEX [company_social_links_fk_social_media_company_company1_idx] ON [dbo].[company_social_links];

-- DropIndex
DROP INDEX [company_social_links_fk_social_media_company_social_media_platform1_idx] ON [dbo].[company_social_links];

-- DropIndex
DROP INDEX [fk_company_testimonials_company1_idx] ON [dbo].[company_testimonials];

-- DropIndex
DROP INDEX [edu_addresses_fk_edu_address_edu_institution1_idx] ON [dbo].[edu_addresses];

-- DropIndex
ALTER TABLE [dbo].[edu_institutions] DROP CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_educators_contacts1_idx] ON [dbo].[educators];

-- DropIndex
DROP INDEX [fk_educators_edu_institution1_idx] ON [dbo].[educators];

-- DropIndex
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [employers_employer_id_UNIQUE];

-- DropIndex
DROP INDEX [employers_fk_employer_user1_idx] ON [dbo].[employers];

-- DropIndex
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [employers_user_id_key];

-- DropIndex
DROP INDEX [fk_employers_company1_idx] ON [dbo].[employers];

-- DropIndex
DROP INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_job_listing1_idx] ON [dbo].[job_listing_has_skills];

-- DropIndex
DROP INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_skill1_idx] ON [dbo].[job_listing_has_skills];

-- DropIndex
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [job_listing_has_skills_job_listing_has_skill_category_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_job_postings_companies1_idx] ON [dbo].[job_postings];

-- DropIndex
DROP INDEX [fk_job_postings_company_addresses1_idx] ON [dbo].[job_postings];

-- DropIndex
DROP INDEX [fk_job_postings_employers1_idx] ON [dbo].[job_postings];

-- DropIndex
DROP INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings];

-- DropIndex
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [job_postings_job_listing_id_UNIQUE];

-- DropIndex
DROP INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_jobseeker1_idx] ON [dbo].[jobseeker_has_skills];

-- DropIndex
DROP INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_skill1_idx] ON [dbo].[jobseeker_has_skills];

-- DropIndex
DROP INDEX [jobseekers_fk_jobseeker_Pathways1_idx] ON [dbo].[jobseekers];

-- DropIndex
DROP INDEX [jobseekers_fk_learner_user1_idx] ON [dbo].[jobseekers];

-- DropIndex
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [jobseekers_learner_id_UNIQUE];

-- DropIndex
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [jobseekers_user_id_key];

-- DropIndex
DROP INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education];

-- DropIndex
DROP INDEX [fk_jobseeker_education_jobseeker1_idx] ON [dbo].[jobseekers_education];

-- DropIndex
DROP INDEX [jobseekers_private_data_fk_user_learner_private_data_user1] ON [dbo].[jobseekers_private_data];

-- DropIndex
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [jobseekers_private_data_jobseeker_id_key];

-- DropIndex
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [jobseekers_private_data_learner_private_data_id_UNIQUE];

-- DropIndex
DROP INDEX [jobseekers_skill_gap_data_fk_learner_skill_gap_data_learner1] ON [dbo].[jobseekers_skill_gap_data];

-- DropIndex
ALTER TABLE [dbo].[jobseekers_skill_gap_data] DROP CONSTRAINT [jobseekers_skill_gap_data_learner_skill_gap_data_id_UNIQUE];

-- DropIndex
DROP INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_proj_based_tech_as_idx] ON [dbo].[learner_proj_based_tech_assessment];

-- DropIndex
DROP INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_user1_idx] ON [dbo].[learner_proj_based_tech_assessment];

-- DropIndex
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [learner_proj_based_tech_assessment_id_UNIQUE];

-- DropIndex
DROP INDEX [pathway_has_skills_fk_Pathways_has_skill_Pathways1_idx] ON [dbo].[pathway_has_skills];

-- DropIndex
DROP INDEX [pathway_has_skills_fk_Pathways_has_skill_skill1_idx] ON [dbo].[pathway_has_skills];

-- DropIndex
DROP INDEX [fk_pathway_subcategories_pathways1_idx] ON [dbo].[pathway_subcategories];

-- DropIndex
DROP INDEX [fk_proj_based_tech_assessments_Pathways1_idx] ON [dbo].[proj_based_tech_assessments];

-- DropIndex
ALTER TABLE [dbo].[proj_based_tech_assessments] DROP CONSTRAINT [proj_based_tech_assessments_proj_based_tech_assessment_id_UNIQUE];

-- DropIndex
DROP INDEX [project_experiences_fk_project_experience_jobseeker1_idx] ON [dbo].[project_experiences];

-- DropIndex
DROP INDEX [project_has_skills_fk_project_experience_has_skill_project_experience1_idx] ON [dbo].[project_has_skills];

-- DropIndex
DROP INDEX [project_has_skills_fk_project_experience_has_skill_skill1_idx] ON [dbo].[project_has_skills];

-- DropIndex
DROP INDEX [sa_possible_answers_fk_sa_possible_answer_sa_question1_idx] ON [dbo].[sa_possible_answers];

-- DropIndex
ALTER TABLE [dbo].[sa_possible_answers] DROP CONSTRAINT [sa_possible_answers_sa_possible_answer_id_UNIQUE];

-- DropIndex
DROP INDEX [sa_questions_fk_sa_question_self_assessment1_idx] ON [dbo].[sa_questions];

-- DropIndex
ALTER TABLE [dbo].[sa_questions] DROP CONSTRAINT [sa_questions_sa_question_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_self_assessments_Pathways1_idx] ON [dbo].[self_assessments];

-- DropIndex
ALTER TABLE [dbo].[self_assessments] DROP CONSTRAINT [self_assessments_self_assessment_id_UNIQUE];

-- DropIndex
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_skill_category_id_UNIQUE];

-- DropIndex
DROP INDEX [skills_fk_skill_skill_category_idx] ON [dbo].[skills];

-- DropIndex
ALTER TABLE [dbo].[skills] DROP CONSTRAINT [skills_skill_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_training_program_has_skills_skills1_idx] ON [dbo].[training_program_has_skills];

-- DropIndex
DROP INDEX [fk_training_program_has_skills_training_program1_idx] ON [dbo].[training_program_has_skills];

-- DropIndex
DROP INDEX [training_programs_fk_training_program_Pathways1_idx] ON [dbo].[training_programs];

-- DropIndex
DROP INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[training_programs];

-- DropIndex
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [training_programs_training_program_id_UNIQUE];

-- DropIndex
DROP INDEX [training_providers_fk_training_provider_edu_institution1_idx] ON [dbo].[training_providers];

-- DropIndex
DROP INDEX [training_providers_fk_training_provider_user1_idx] ON [dbo].[training_providers];

-- DropIndex
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [training_providers_training_provider_id_UNIQUE];

-- DropIndex
DROP INDEX [contact_addresses_fk_address_contacts1_idx] ON [dbo].[user_addresses];

-- DropIndex
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [user_addresses_user_id_key];

-- DropIndex
ALTER TABLE [dbo].[users] DROP CONSTRAINT [contacts_user_id_UNIQUE];

-- DropIndex
DROP INDEX [volunteer_has_skills_fk_volunteer_has_skill_skill1_idx] ON [dbo].[volunteer_has_skills];

-- DropIndex
DROP INDEX [volunteer_has_skills_fk_volunteer_has_skill_volunteer1_idx] ON [dbo].[volunteer_has_skills];

-- DropIndex
DROP INDEX [volunteers_fk_mentor_user1_idx] ON [dbo].[volunteers];

-- DropIndex
ALTER TABLE [dbo].[volunteers] DROP CONSTRAINT [volunteers_mentor_id_UNIQUE];

-- DropIndex
DROP INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences];

-- DropIndex
DROP INDEX [work_experiences_fk_work_experience_jobseeker1_idx] ON [dbo].[work_experiences];

-- AlterTable
ALTER TABLE [dbo].[case_mgmt] DROP CONSTRAINT [case_mgmt_PRIMARY],
[case_mgmt_case_mgmt_id_df];
ALTER TABLE [dbo].[case_mgmt] ALTER COLUMN [jobseeker_learner_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[case_mgmt] ALTER COLUMN [cfa_admin_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[case_mgmt] ALTER COLUMN [case_mgmt_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [case_mgmt_case_mgmt_id_df] DEFAULT newid() FOR [case_mgmt_id], CONSTRAINT case_mgmt_PRIMARY PRIMARY KEY NONCLUSTERED ([case_mgmt_id]);

-- AlterTable
ALTER TABLE [dbo].[certificates] DROP CONSTRAINT [certificates_PRIMARY];
ALTER TABLE [dbo].[certificates] ALTER COLUMN [certification_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[certificates] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[certificates] ADD CONSTRAINT certificates_PRIMARY PRIMARY KEY NONCLUSTERED ([certification_id]);

-- AlterTable
ALTER TABLE [dbo].[cfa_admin] DROP CONSTRAINT [cfa_admin_PRIMARY];
ALTER TABLE [dbo].[cfa_admin] ALTER COLUMN [admin_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[cfa_admin] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT cfa_admin_PRIMARY PRIMARY KEY NONCLUSTERED ([admin_id]);

-- AlterTable
ALTER TABLE [dbo].[companies] DROP CONSTRAINT [companies_PRIMARY];
ALTER TABLE [dbo].[companies] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[companies] ALTER COLUMN [industry_sector_id] UNIQUEIDENTIFIER NULL;
ALTER TABLE [dbo].[companies] ADD CONSTRAINT companies_PRIMARY PRIMARY KEY NONCLUSTERED ([company_id]);

-- AlterTable
ALTER TABLE [dbo].[company_addresses] DROP CONSTRAINT [company_addresses_PRIMARY];
ALTER TABLE [dbo].[company_addresses] ALTER COLUMN [company_address_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_addresses] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT company_addresses_PRIMARY PRIMARY KEY NONCLUSTERED ([company_address_id]);

-- AlterTable
ALTER TABLE [dbo].[company_social_links] DROP CONSTRAINT [company_social_links_PRIMARY];
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [social_media_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [social_platform_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_social_links] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT company_social_links_PRIMARY PRIMARY KEY NONCLUSTERED ([social_media_id]);

-- AlterTable
ALTER TABLE [dbo].[company_testimonials] DROP CONSTRAINT [company_testimonials_PRIMARY];
ALTER TABLE [dbo].[company_testimonials] ALTER COLUMN [testimonial_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_testimonials] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_testimonials] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[company_testimonials] ADD CONSTRAINT company_testimonials_PRIMARY PRIMARY KEY NONCLUSTERED ([testimonial_id]);

-- AlterTable
ALTER TABLE [dbo].[edu_addresses] DROP CONSTRAINT [edu_addresses_PRIMARY];
ALTER TABLE [dbo].[edu_addresses] ALTER COLUMN [edu_address_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[edu_addresses] ALTER COLUMN [edu_institution_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT edu_addresses_PRIMARY PRIMARY KEY NONCLUSTERED ([edu_address_id]);

-- AlterTable
ALTER TABLE [dbo].[edu_institutions] DROP CONSTRAINT [edu_institutions_PRIMARY];
ALTER TABLE [dbo].[edu_institutions] ALTER COLUMN [edu_institution_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[edu_institutions] ADD CONSTRAINT edu_institutions_PRIMARY PRIMARY KEY NONCLUSTERED ([edu_institution_id]);

-- AlterTable
ALTER TABLE [dbo].[educators] DROP CONSTRAINT [educators_PRIMARY];
ALTER TABLE [dbo].[educators] ALTER COLUMN [educator_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[educators] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[educators] ALTER COLUMN [edu_institution_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[educators] ADD CONSTRAINT educators_PRIMARY PRIMARY KEY NONCLUSTERED ([educator_id]);

-- AlterTable
ALTER TABLE [dbo].[employers] DROP CONSTRAINT [employers_PRIMARY];
ALTER TABLE [dbo].[employers] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[employers] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[employers] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NULL;
ALTER TABLE [dbo].[employers] ALTER COLUMN [work_address_id] UNIQUEIDENTIFIER NULL;
ALTER TABLE [dbo].[employers] ADD CONSTRAINT employers_PRIMARY PRIMARY KEY NONCLUSTERED ([employer_id]);

-- AlterTable
ALTER TABLE [dbo].[industry_sectors] DROP CONSTRAINT [industry_sectors_PRIMARY];
ALTER TABLE [dbo].[industry_sectors] ALTER COLUMN [industry_sector_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[industry_sectors] ADD CONSTRAINT industry_sectors_PRIMARY PRIMARY KEY NONCLUSTERED ([industry_sector_id]);

-- AlterTable
ALTER TABLE [dbo].[job_listing_has_skills] DROP CONSTRAINT [job_listing_has_skills_PRIMARY];
ALTER TABLE [dbo].[job_listing_has_skills] ALTER COLUMN [job_listing_has_skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_listing_has_skills] ALTER COLUMN [job_listing_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_listing_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT job_listing_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([job_listing_has_skill_id]);

-- AlterTable
ALTER TABLE [dbo].[job_postings] DROP CONSTRAINT [job_postings_PRIMARY];
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [job_posting_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [company_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [employer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [technology_area_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_postings] ALTER COLUMN [location_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT job_postings_PRIMARY PRIMARY KEY NONCLUSTERED ([job_posting_id]);

-- AlterTable
ALTER TABLE [dbo].[jobseeker_has_skills] DROP CONSTRAINT [jobseeker_has_skills_PRIMARY];
ALTER TABLE [dbo].[jobseeker_has_skills] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseeker_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT jobseeker_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([jobseeker_id],[skill_id]);

-- AlterTable
ALTER TABLE [dbo].[jobseekers] DROP CONSTRAINT [jobseekers_PRIMARY];
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers] ALTER COLUMN [targeted_pathway] UNIQUEIDENTIFIER NULL;
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT jobseekers_PRIMARY PRIMARY KEY NONCLUSTERED ([jobseeker_id]);

-- AlterTable
ALTER TABLE [dbo].[jobseekers_education] DROP CONSTRAINT [jobseekers_education_jobseeker_ed_id_df],
[jobseekers_education_pkey];
ALTER TABLE [dbo].[jobseekers_education] ALTER COLUMN [jobseeker_ed_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_education] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_education] ALTER COLUMN [edu_institution_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [jobseekers_education_jobseeker_ed_id_df] DEFAULT newid() FOR [jobseeker_ed_id], CONSTRAINT jobseekers_education_pkey PRIMARY KEY CLUSTERED ([jobseeker_ed_id]);

-- AlterTable
ALTER TABLE [dbo].[jobseekers_private_data] DROP CONSTRAINT [jobseekers_private_data_PRIMARY];
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [jobseeker_private_data_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT jobseekers_private_data_PRIMARY PRIMARY KEY NONCLUSTERED ([jobseeker_private_data_id]);

-- AlterTable
ALTER TABLE [dbo].[jobseekers_skill_gap_data] DROP CONSTRAINT [jobseekers_skill_gap_data_PRIMARY];
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ALTER COLUMN [jobseeker_skill_gap_data_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ADD CONSTRAINT jobseekers_skill_gap_data_PRIMARY PRIMARY KEY NONCLUSTERED ([jobseeker_skill_gap_data_id]);

-- AlterTable
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] DROP CONSTRAINT [learner_proj_based_tech_assessment_PRIMARY];
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ALTER COLUMN [learner_proj_based_tech_assessment_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ALTER COLUMN [proj_based_tech_assessment_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT learner_proj_based_tech_assessment_PRIMARY PRIMARY KEY NONCLUSTERED ([learner_proj_based_tech_assessment_id]);

-- AlterTable
ALTER TABLE [dbo].[pathway_has_skills] DROP CONSTRAINT [pathway_has_skills_PRIMARY];
ALTER TABLE [dbo].[pathway_has_skills] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[pathway_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[pathway_has_skills] ADD CONSTRAINT pathway_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([pathway_id],[skill_id]);

-- AlterTable
ALTER TABLE [dbo].[pathway_subcategories] DROP CONSTRAINT [pathway_subcategories_PRIMARY];
ALTER TABLE [dbo].[pathway_subcategories] ALTER COLUMN [pathway_subcategory_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[pathway_subcategories] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[pathway_subcategories] ADD CONSTRAINT pathway_subcategories_PRIMARY PRIMARY KEY NONCLUSTERED ([pathway_subcategory_id],[pathway_id]);

-- AlterTable
ALTER TABLE [dbo].[pathways] DROP CONSTRAINT [pathways_PRIMARY];
ALTER TABLE [dbo].[pathways] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[pathways] ADD CONSTRAINT pathways_PRIMARY PRIMARY KEY NONCLUSTERED ([pathway_id]);

-- AlterTable
ALTER TABLE [dbo].[proj_based_tech_assessments] DROP CONSTRAINT [proj_based_tech_assessments_PRIMARY];
ALTER TABLE [dbo].[proj_based_tech_assessments] ALTER COLUMN [proj_based_tech_assessment_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[proj_based_tech_assessments] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[proj_based_tech_assessments] ADD CONSTRAINT proj_based_tech_assessments_PRIMARY PRIMARY KEY NONCLUSTERED ([proj_based_tech_assessment_id]);

-- AlterTable
ALTER TABLE [dbo].[project_experiences] DROP CONSTRAINT [project_experiences_PRIMARY],
[project_experiences_proj_exp_id_df];
ALTER TABLE [dbo].[project_experiences] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[project_experiences] ALTER COLUMN [proj_exp_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[project_experiences] ADD CONSTRAINT [project_experiences_proj_exp_id_df] DEFAULT newid() FOR [proj_exp_id], CONSTRAINT project_experiences_PRIMARY PRIMARY KEY NONCLUSTERED ([proj_exp_id]);

-- AlterTable
ALTER TABLE [dbo].[project_has_skills] DROP CONSTRAINT [project_has_skills_PRIMARY];
ALTER TABLE [dbo].[project_has_skills] ALTER COLUMN [proj_exp_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[project_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT project_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([proj_exp_id],[skill_id]);

-- AlterTable
ALTER TABLE [dbo].[sa_possible_answers] DROP CONSTRAINT [sa_possible_answers_PRIMARY];
ALTER TABLE [dbo].[sa_possible_answers] ALTER COLUMN [sa_possible_answer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[sa_possible_answers] ALTER COLUMN [sa_question_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[sa_possible_answers] ADD CONSTRAINT sa_possible_answers_PRIMARY PRIMARY KEY NONCLUSTERED ([sa_possible_answer_id]);

-- AlterTable
ALTER TABLE [dbo].[sa_questions] DROP CONSTRAINT [sa_questions_PRIMARY];
ALTER TABLE [dbo].[sa_questions] ALTER COLUMN [sa_question_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[sa_questions] ALTER COLUMN [self_assessment_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[sa_questions] ADD CONSTRAINT sa_questions_PRIMARY PRIMARY KEY NONCLUSTERED ([sa_question_id]);

-- AlterTable
ALTER TABLE [dbo].[self_assessments] DROP CONSTRAINT [self_assessments_PRIMARY];
ALTER TABLE [dbo].[self_assessments] ALTER COLUMN [self_assessment_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[self_assessments] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[self_assessments] ADD CONSTRAINT self_assessments_PRIMARY PRIMARY KEY NONCLUSTERED ([self_assessment_id]);

-- AlterTable
ALTER TABLE [dbo].[skill_subcategories] DROP CONSTRAINT [skill_subcategories_PRIMARY],
[skill_subcategories_skill_subcategory_id_df];
ALTER TABLE [dbo].[skill_subcategories] ALTER COLUMN [skill_subcategory_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_subcategory_id_df] DEFAULT (newid()) FOR [skill_subcategory_id], CONSTRAINT skill_subcategories_PRIMARY PRIMARY KEY NONCLUSTERED ([skill_subcategory_id]);

-- AlterTable
ALTER TABLE [dbo].[skills] DROP CONSTRAINT [skills_PRIMARY];
ALTER TABLE [dbo].[skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[skills] ALTER COLUMN [skill_subcategory_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[skills] ADD CONSTRAINT skills_PRIMARY PRIMARY KEY NONCLUSTERED ([skill_id]);

-- AlterTable
ALTER TABLE [dbo].[social_media_platforms] DROP CONSTRAINT [social_media_platforms_PRIMARY];
ALTER TABLE [dbo].[social_media_platforms] ALTER COLUMN [social_platform_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[social_media_platforms] ADD CONSTRAINT social_media_platforms_PRIMARY PRIMARY KEY NONCLUSTERED ([social_platform_id]);

-- AlterTable
ALTER TABLE [dbo].[technology_areas] DROP CONSTRAINT [technology_areas_PRIMARY];
ALTER TABLE [dbo].[technology_areas] ALTER COLUMN [technology_area_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[technology_areas] ADD CONSTRAINT technology_areas_PRIMARY PRIMARY KEY NONCLUSTERED ([technology_area_id]);

-- AlterTable
ALTER TABLE [dbo].[training_program_has_skills] DROP CONSTRAINT [training_program_has_skills_PRIMARY];
ALTER TABLE [dbo].[training_program_has_skills] ALTER COLUMN [training_program_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_program_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_program_has_skills] ADD CONSTRAINT training_program_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([training_program_id],[skill_id]);

-- AlterTable
ALTER TABLE [dbo].[training_programs] DROP CONSTRAINT [training_programs_PRIMARY];
ALTER TABLE [dbo].[training_programs] ALTER COLUMN [training_program_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_programs] ALTER COLUMN [training_provider_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_programs] ALTER COLUMN [pathway_id] UNIQUEIDENTIFIER NULL;
ALTER TABLE [dbo].[training_programs] ADD CONSTRAINT training_programs_PRIMARY PRIMARY KEY NONCLUSTERED ([training_program_id]);

-- AlterTable
ALTER TABLE [dbo].[training_providers] DROP CONSTRAINT [training_providers_PRIMARY];
ALTER TABLE [dbo].[training_providers] ALTER COLUMN [training_provider_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_providers] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_providers] ALTER COLUMN [edu_institution_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT training_providers_PRIMARY PRIMARY KEY NONCLUSTERED ([training_provider_id]);

-- AlterTable
ALTER TABLE [dbo].[user_addresses] DROP CONSTRAINT [contact_addresses_PRIMARY];
ALTER TABLE [dbo].[user_addresses] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[user_addresses] ALTER COLUMN [user_address_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT contact_addresses_PRIMARY PRIMARY KEY NONCLUSTERED ([user_address_id]);

-- AlterTable
ALTER TABLE [dbo].[users] DROP CONSTRAINT [contacts_PRIMARY];
ALTER TABLE [dbo].[users] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[users] ADD CONSTRAINT contacts_PRIMARY PRIMARY KEY NONCLUSTERED ([user_id]);

-- AlterTable
ALTER TABLE [dbo].[volunteer_has_skills] DROP CONSTRAINT [volunteer_has_skills_PRIMARY];
ALTER TABLE [dbo].[volunteer_has_skills] ALTER COLUMN [volunteer_skills_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[volunteer_has_skills] ALTER COLUMN [volunteer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[volunteer_has_skills] ALTER COLUMN [skill_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[volunteer_has_skills] ADD CONSTRAINT volunteer_has_skills_PRIMARY PRIMARY KEY NONCLUSTERED ([volunteer_skills_id]);

-- AlterTable
ALTER TABLE [dbo].[volunteers] DROP CONSTRAINT [volunteers_PRIMARY];
ALTER TABLE [dbo].[volunteers] ALTER COLUMN [volunteer_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[volunteers] ALTER COLUMN [user_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT volunteers_PRIMARY PRIMARY KEY NONCLUSTERED ([volunteer_id]);

-- AlterTable
ALTER TABLE [dbo].[work_experiences] DROP CONSTRAINT [work_experiences_PRIMARY];
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [work_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [jobseeker_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[work_experiences] ALTER COLUMN [technology_area_id] UNIQUEIDENTIFIER NOT NULL;
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT work_experiences_PRIMARY PRIMARY KEY NONCLUSTERED ([work_id]);

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
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT [company_addresses_company_id_city_unique] UNIQUE NONCLUSTERED ([company_id], [city]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_social_links_fk_social_media_company_company1_idx] ON [dbo].[company_social_links]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [company_social_links_fk_social_media_company_social_media_platform1_idx] ON [dbo].[company_social_links]([social_platform_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_company_testimonials_company1_idx] ON [dbo].[company_testimonials]([company_id]);

-- CreateIndex
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT [user_addresses_user_id_key] UNIQUE NONCLUSTERED ([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [contact_addresses_fk_address_contacts1_idx] ON [dbo].[user_addresses]([user_id]);

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [contacts_user_id_UNIQUE] UNIQUE NONCLUSTERED ([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [edu_addresses_fk_edu_address_edu_institution1_idx] ON [dbo].[edu_addresses]([edu_institution_id]);

-- CreateIndex
ALTER TABLE [dbo].[edu_institutions] ADD CONSTRAINT [edu_institutions_edu_institution_id_UNIQUE] UNIQUE NONCLUSTERED ([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_educators_contacts1_idx] ON [dbo].[educators]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_educators_edu_institution1_idx] ON [dbo].[educators]([edu_institution_id]);

-- CreateIndex
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [employers_employer_id_UNIQUE] UNIQUE NONCLUSTERED ([employer_id]);

-- CreateIndex
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [employers_user_id_key] UNIQUE NONCLUSTERED ([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [employers_fk_employer_user1_idx] ON [dbo].[employers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_employers_company1_idx] ON [dbo].[employers]([company_id]);

-- CreateIndex
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT [job_listing_has_skills_job_listing_has_skill_category_id_UNIQUE] UNIQUE NONCLUSTERED ([job_listing_has_skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_job_listing1_idx] ON [dbo].[job_listing_has_skills]([job_listing_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [job_listing_has_skills_fk_job_listing_has_skill_category_skill1_idx] ON [dbo].[job_listing_has_skills]([skill_id]);

-- CreateIndex
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [job_postings_job_listing_id_UNIQUE] UNIQUE NONCLUSTERED ([job_posting_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_company_addresses1_idx] ON [dbo].[job_postings]([location_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_companies1_idx] ON [dbo].[job_postings]([company_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_employers1_idx] ON [dbo].[job_postings]([employer_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_job_postings_technology_areas1_idx] ON [dbo].[job_postings]([technology_area_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_jobseeker1_idx] ON [dbo].[jobseeker_has_skills]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseeker_has_skills_fk_jobseeker_has_skill_skill1_idx] ON [dbo].[jobseeker_has_skills]([skill_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [jobseekers_learner_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [jobseekers_user_id_key] UNIQUE NONCLUSTERED ([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_fk_jobseeker_Pathways1_idx] ON [dbo].[jobseekers]([targeted_pathway]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_fk_learner_user1_idx] ON [dbo].[jobseekers]([user_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [jobseekers_private_data_learner_private_data_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_private_data_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [jobseekers_private_data_jobseeker_id_key] UNIQUE NONCLUSTERED ([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_private_data_fk_user_learner_private_data_user1] ON [dbo].[jobseekers_private_data]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_jobseeker1_idx] ON [dbo].[jobseekers_education]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_jobseeker_education_edu_institution1_idx] ON [dbo].[jobseekers_education]([edu_institution_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ADD CONSTRAINT [jobseekers_skill_gap_data_learner_skill_gap_data_id_UNIQUE] UNIQUE NONCLUSTERED ([jobseeker_skill_gap_data_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [jobseekers_skill_gap_data_fk_learner_skill_gap_data_learner1] ON [dbo].[jobseekers_skill_gap_data]([jobseeker_id]);

-- CreateIndex
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [learner_proj_based_tech_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([learner_proj_based_tech_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_proj_based_tech_as_idx] ON [dbo].[learner_proj_based_tech_assessment]([proj_based_tech_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [learner_proj_based_tech_assessment_fk_user_has_proj_based_tech_assessment_user1_idx] ON [dbo].[learner_proj_based_tech_assessment]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pathway_has_skills_fk_Pathways_has_skill_Pathways1_idx] ON [dbo].[pathway_has_skills]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pathway_has_skills_fk_Pathways_has_skill_skill1_idx] ON [dbo].[pathway_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_pathway_subcategories_pathways1_idx] ON [dbo].[pathway_subcategories]([pathway_id]);

-- CreateIndex
ALTER TABLE [dbo].[proj_based_tech_assessments] ADD CONSTRAINT [proj_based_tech_assessments_proj_based_tech_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([proj_based_tech_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_proj_based_tech_assessments_Pathways1_idx] ON [dbo].[proj_based_tech_assessments]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_experiences_fk_project_experience_jobseeker1_idx] ON [dbo].[project_experiences]([jobseeker_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_has_skills_fk_project_experience_has_skill_project_experience1_idx] ON [dbo].[project_has_skills]([proj_exp_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [project_has_skills_fk_project_experience_has_skill_skill1_idx] ON [dbo].[project_has_skills]([skill_id]);

-- CreateIndex
ALTER TABLE [dbo].[sa_possible_answers] ADD CONSTRAINT [sa_possible_answers_sa_possible_answer_id_UNIQUE] UNIQUE NONCLUSTERED ([sa_possible_answer_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [sa_possible_answers_fk_sa_possible_answer_sa_question1_idx] ON [dbo].[sa_possible_answers]([sa_question_id]);

-- CreateIndex
ALTER TABLE [dbo].[sa_questions] ADD CONSTRAINT [sa_questions_sa_question_id_UNIQUE] UNIQUE NONCLUSTERED ([sa_question_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [sa_questions_fk_sa_question_self_assessment1_idx] ON [dbo].[sa_questions]([self_assessment_id]);

-- CreateIndex
ALTER TABLE [dbo].[self_assessments] ADD CONSTRAINT [self_assessments_self_assessment_id_UNIQUE] UNIQUE NONCLUSTERED ([self_assessment_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_self_assessments_Pathways1_idx] ON [dbo].[self_assessments]([pathway_id]);

-- CreateIndex
ALTER TABLE [dbo].[skill_subcategories] ADD CONSTRAINT [skill_subcategories_skill_category_id_UNIQUE] UNIQUE NONCLUSTERED ([skill_subcategory_id]);

-- CreateIndex
ALTER TABLE [dbo].[skills] ADD CONSTRAINT [skills_skill_id_UNIQUE] UNIQUE NONCLUSTERED ([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [skills_fk_skill_skill_category_idx] ON [dbo].[skills]([skill_subcategory_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_skills1_idx] ON [dbo].[training_program_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_training_program_has_skills_training_program1_idx] ON [dbo].[training_program_has_skills]([training_program_id]);

-- CreateIndex
ALTER TABLE [dbo].[training_programs] ADD CONSTRAINT [training_programs_training_program_id_UNIQUE] UNIQUE NONCLUSTERED ([training_program_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_Pathways1_idx] ON [dbo].[training_programs]([pathway_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_programs_fk_training_program_training_provider1_idx] ON [dbo].[training_programs]([training_provider_id]);

-- CreateIndex
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [training_providers_training_provider_id_UNIQUE] UNIQUE NONCLUSTERED ([training_provider_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_providers_fk_training_provider_edu_institution1_idx] ON [dbo].[training_providers]([edu_institution_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [training_providers_fk_training_provider_user1_idx] ON [dbo].[training_providers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteer_has_skills_fk_volunteer_has_skill_skill1_idx] ON [dbo].[volunteer_has_skills]([skill_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteer_has_skills_fk_volunteer_has_skill_volunteer1_idx] ON [dbo].[volunteer_has_skills]([volunteer_id]);

-- CreateIndex
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT [volunteers_mentor_id_UNIQUE] UNIQUE NONCLUSTERED ([volunteer_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [volunteers_fk_mentor_user1_idx] ON [dbo].[volunteers]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [fk_work_experiences_technology_areas1_idx] ON [dbo].[work_experiences]([technology_area_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [work_experiences_fk_work_experience_jobseeker1_idx] ON [dbo].[work_experiences]([jobseeker_id]);

-- CreateIndex
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [jobseekers_private_data_ssn_key] UNIQUE NONCLUSTERED ([ssn]);

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_admin1] FOREIGN KEY ([cfa_admin_id]) REFERENCES [dbo].[cfa_admin]([admin_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[case_mgmt] ADD CONSTRAINT [fk_case_mgmt_jobseeker1] FOREIGN KEY ([jobseeker_learner_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[certificates] ADD CONSTRAINT [fk_certificates_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[cfa_admin] ADD CONSTRAINT [fk_admin_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[companies] ADD CONSTRAINT [fk_company_industry_sectors1] FOREIGN KEY ([industry_sector_id]) REFERENCES [dbo].[industry_sectors]([industry_sector_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_addresses] ADD CONSTRAINT [fk_company_address_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_company_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_company_social_media_platform1] FOREIGN KEY ([social_platform_id]) REFERENCES [dbo].[social_media_platforms]([social_platform_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_social_links] ADD CONSTRAINT [fk_social_media_employer_employer1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_testimonials] ADD CONSTRAINT [fk_company_testimonials_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company_testimonials] ADD CONSTRAINT [fk_company_testimonals_employer1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[user_addresses] ADD CONSTRAINT [fk_address_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[edu_addresses] ADD CONSTRAINT [fk_edu_address_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_contacts1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[educators] ADD CONSTRAINT [fk_educators_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employer_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employers_company1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employers] ADD CONSTRAINT [fk_employers_company_addresses] FOREIGN KEY ([work_address_id]) REFERENCES [dbo].[company_addresses]([company_address_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT [fk_job_listing_has_skill_category_job_listing1] FOREIGN KEY ([job_listing_id]) REFERENCES [dbo].[job_postings]([job_posting_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_listing_has_skills] ADD CONSTRAINT [fk_job_listing_has_skill_category_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_companies1] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([company_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_employers1] FOREIGN KEY ([employer_id]) REFERENCES [dbo].[employers]([employer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[technology_areas]([technology_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[job_postings] ADD CONSTRAINT [fk_job_postings_company_addresses1] FOREIGN KEY ([location_id]) REFERENCES [dbo].[company_addresses]([company_address_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT [fk_jobseeker_has_skill_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseeker_has_skills] ADD CONSTRAINT [fk_jobseeker_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_jobseeker_Pathways1] FOREIGN KEY ([targeted_pathway]) REFERENCES [dbo].[pathways]([pathway_id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers] ADD CONSTRAINT [fk_learner_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_private_data] ADD CONSTRAINT [fk_user_learner_private_data_user1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_education] ADD CONSTRAINT [fk_jobseeker_education_edu_institution1] FOREIGN KEY ([edu_institution_id]) REFERENCES [dbo].[edu_institutions]([edu_institution_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[jobseekers_skill_gap_data] ADD CONSTRAINT [fk_learner_skill_gap_data_learner1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [fk_user_has_proj_based_tech_assessment_proj_based_tech_asse1] FOREIGN KEY ([proj_based_tech_assessment_id]) REFERENCES [dbo].[proj_based_tech_assessments]([proj_based_tech_assessment_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learner_proj_based_tech_assessment] ADD CONSTRAINT [fk_user_has_proj_based_tech_assessment_user1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE [dbo].[project_has_skills] ADD CONSTRAINT [fk_project_experience_has_skill_project_experience1] FOREIGN KEY ([proj_exp_id]) REFERENCES [dbo].[project_experiences]([proj_exp_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE [dbo].[training_providers] ADD CONSTRAINT [fk_training_provider_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] ADD CONSTRAINT [fk_volunteer_has_skill_skill1] FOREIGN KEY ([skill_id]) REFERENCES [dbo].[skills]([skill_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteer_has_skills] ADD CONSTRAINT [fk_volunteer_has_skill_volunteer1] FOREIGN KEY ([volunteer_id]) REFERENCES [dbo].[volunteers]([volunteer_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[volunteers] ADD CONSTRAINT [fk_mentor_user1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experience_jobseeker1] FOREIGN KEY ([jobseeker_id]) REFERENCES [dbo].[jobseekers]([jobseeker_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_experiences] ADD CONSTRAINT [fk_work_experiences_technology_areas1] FOREIGN KEY ([technology_area_id]) REFERENCES [dbo].[technology_areas]([technology_area_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
