import {devLog} from "@/app/lib/utils";

/**
 * Represents the variables associated with jobseeker pool assignment.
 * @interface
 */
export interface JobseekerPoolVars {
    enrolledWithPartner: boolean; //  jobseekerId -> jobseekers_education iterate to find value edu_providers.isCoalitionMember
    completedPartnerProgram: boolean; // check edu_providers.enrollmentStatus and if edu_providers.isCoalitionMember
    prevTechExperience: boolean; // check work_experience -> technology_areas != "N/A Not an IT role"
    hasDegreeOrTechProgram: boolean; // check gte HighestCompletedEducationLevel.Certificate
    careerPrepComplete: boolean; // add to db in Bethany's records.
}

/**
 * Defines the structure of pool assignments for easy use.
 * @interface
 */
export interface JobseekerPoolAssignment {
    pool1: boolean;
    pool2: boolean;
    pool3: boolean;
}

export interface SelectJobseekerPoolCatResult {
    poolAssignment: JobseekerPoolAssignment;
    careerPrepTrackRecommendation: CareerPrepTrack | null
}

/**
 * Generates a unique key for a jobseeker based on their profile information.
 * @param {JobseekerPoolVars} user - The jobseeker's relevant profile information
 * @returns {string} - The generated key for the jobseeker
 */
export const generatePoolKey = (user: JobseekerPoolVars): string => {
    devLog('generatePoolKey', `${user.enrolledWithPartner}_${user.completedPartnerProgram}_${user.prevTechExperience}_${user.hasDegreeOrTechProgram}_${user.careerPrepComplete}`)
    return `${user.enrolledWithPartner}_${user.completedPartnerProgram}_${user.prevTechExperience}_${user.hasDegreeOrTechProgram}_${user.careerPrepComplete}`;
};



/**
 * Function that selects the jobseeker pool category for a given user based on certain criteria.
 * If a category is found for the user, it returns the pool assignment and career preparation track recommendation.
 * If no category is found, it defaults to 'Pool 3' with a 'Standard' recommendation.
 *
 * @param {JobseekerPoolVars} user - The user object containing information for selecting the category.
 * @returns {Object} An object containing the pool assignment and career preparation track recommendation.
 */
export const selectJobseekerPoolCategory = (user: JobseekerPoolVars): SelectJobseekerPoolCatResult => {
    const key = generatePoolKey(user);

    // Use the dictionary to find the corresponding pool and career prep recommendation, or default to 'Pool 3' with 'Standard' recommendation
    const { poolAssignment, careerPrepTrackRecommendation } = poolAssignmentMap[key] || {
        poolAssignment: PoolCategories.POOL3,
        careerPrepTrackRecommendation: CareerPrepTrack.STANDARD,
    };

    devLog('assignUserToPool\n', { poolAssignment, careerPrepTrackRecommendation });

    // Convert poolAssignment string into JobseekerPoolAssignment object
    const poolAssignmentResult: JobseekerPoolAssignment = {
        pool1: poolAssignment === PoolCategories.POOL1,
        pool2: poolAssignment === PoolCategories.POOL2,
        pool3: poolAssignment === PoolCategories.POOL3,
    };

    devLog('poolAssignmentResult\n', poolAssignmentResult);


    return {
        poolAssignment: poolAssignmentResult,
        careerPrepTrackRecommendation, // The recommendation comes directly from the dictionary
    };
};

/**
 * Represents the possible categories of pools.
 *
 * Enum values:
 * - POOL1: Represents Recommended Jobseeker Candidates
 * - POOL2: Represents Job Ready Candidates
 * - POOL3: Represents Not Ready Candidates
 */
const enum PoolCategories {
    POOL1 = 'Pool 1',
    POOL2 = 'Pool 2',
    POOL3 = 'Pool 3',
}

/**
 * Enum representing the available Career Prep program tracks.
 *
 * @enum {string}
 */
const enum CareerPrepTrack {

    TARGETED = 'TARGETED',
    ACCELERATED = 'ACCELERATED',
    STANDARD = 'STANDARD',
}

/**
 * Represents a logical mapping of boolean options to key for easy modification and scaling.
 * 2^5 combinations = 32 possible combinations.
 * Check against this Google sheet if any confusion.
 * https://docs.google.com/spreadsheets/d/1kF1bor4geEgCVsKKUxf0LgFpLUnxE3CWxV-meZv5rJc/edit?usp=sharing
 * @type {Object.<string, { poolAssignment: string, careerPrepTrackRecommendation: string | null }>}
 */
const poolAssignmentMap: { [key: string]: { poolAssignment: PoolCategories; careerPrepTrackRecommendation: CareerPrepTrack | null } } = {
    // enrolledWithPartner_completedPartnerProgram_prevTechExperience_hasDegreeOrTechProgram_completeCareerPrep
    'true_true_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'true_true_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'true_true_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'true_true_false_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_false_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'true_false_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'true_false_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'true_false_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'true_false_false_false_true': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'true_false_false_false_false': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: CareerPrepTrack.STANDARD },
    'false_true_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'false_true_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'false_true_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'false_true_false_false_true': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: null },
    'false_true_false_false_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'false_false_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_true_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.TARGETED },
    'false_false_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_true_false_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.STANDARD },
    'false_false_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.ACCELERATED },
    'false_false_false_false_true': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null }, // contradiction. Never logically true
    'false_false_false_false_false': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
};
