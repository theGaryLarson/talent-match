/**
 * Represents the variables associated with jobseeker pool assignment.
 * @interface
 */
export interface JobseekerPoolVars {
    enrolledWithPartner: boolean; //  jobseekerId -> jobseekers_education iterate to find value edu_providers.isCoalitionMember
    completedPartnerProgram: boolean; // check edu_providers.graduation_date if edu_providers.isCoalitionMember
    prevTechExperience: boolean; // check work_experience -> technology_areas != "N/A Not an IT role"
    hasDegreeOrTechProgram: boolean; // check gte HighestCompletedEducationLevel.Certificate
    completeCareerPrep: boolean; // add to db in Bethany's records.
}

/**
 * Generates a unique key for a jobseeker based on their profile information.
 * @param {JobseekerPoolVars} user - The jobseeker's relevant profile information
 * @returns {string} - The generated key for the jobseeker
 */
export const generatePoolKey = (user: JobseekerPoolVars): string => {
    return `${user.enrolledWithPartner}_${user.completedPartnerProgram}_${user.prevTechExperience}_${user.hasDegreeOrTechProgram}_${user.completeCareerPrep}`;
};


/**
 * Assigns a user to a jobseeker pool and retrieves the corresponding career preparation recommendation.
 *
 * @param {JobseekerPoolVars} user - The user information to assign to a pool.
 * @returns {object} An object containing the assigned pool and career prep recommendation for the user.
 */
export const assignUserToPool = (user: JobseekerPoolVars): object => {
    const key = generatePoolKey(user);

    // Use the dictionary to find the corresponding pool and career prep recommendation, or default to 'Pool 3' with 'Standard' recommendation
    const { poolAssignment, careerPrepTrackRecommendation } = poolAssignmentMap[key] || {
        poolAssignment: PoolCategories.POOL3,
        careerPrepTrackRecommendation: CareerPrepTrack.STANDARD,
    };

    return {
        poolAssignment,
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
    FAST = 'FAST',
    STANDARD = 'STANDARD'
}

/**
 * Represents a logical mapping of boolean options to key for easy modification and scaling.
 * 2^5 combinations = 32 possible combinations.
 * Check against this Google sheet if any confusion.
 * https://docs.google.com/spreadsheets/d/1kF1bor4geEgCVsKKUxf0LgFpLUnxE3CWxV-meZv5rJc/edit?usp=sharing
 * @type {Object.<string, { poolAssignment: string, careerPrepTrackRecommendation: string | null }>}
 */
const poolAssignmentMap: { [key: string]: { poolAssignment: string; careerPrepTrackRecommendation: string | null } } = {
    // enrolledWithProvider_completedPartnerProgram_prevTechExperience_hasDegreeOrTechProgram_completeCareerPrep
    'true_true_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_true_false_false_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: null },
    'true_false_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'true_false_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: null },
    'true_false_false_false_true': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'true_false_false_false_false': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'false_true_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_true_true_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_true_false_false': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_true_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: null },
    'false_true_false_false_true': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'false_true_false_false_false': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'false_false_true_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_true_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.FAST },
    'false_false_true_false_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_true_false_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: CareerPrepTrack.FAST },
    'false_false_false_true_true': { poolAssignment: PoolCategories.POOL1, careerPrepTrackRecommendation: null },
    'false_false_false_true_false': { poolAssignment: PoolCategories.POOL2, careerPrepTrackRecommendation: null },
    'false_false_false_false_true': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: null },
    'false_false_false_false_false': { poolAssignment: PoolCategories.POOL3, careerPrepTrackRecommendation: CareerPrepTrack.STANDARD },
};
