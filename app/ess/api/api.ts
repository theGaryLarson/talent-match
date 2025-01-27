import msalInstance from "../../../msal-instance";

const getToken = async (): Promise<string> => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    throw new Error("No accounts found");
  }

  const account = accounts[0];
  const scopes = [`${process.env.NEXT_PUBLIC_TOKEN_SCOPE}`];
  const response = await msalInstance.acquireTokenSilent({
    scopes,
    account,
  });

  return response.accessToken;
};

export const fetchPathways = async (): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_pathwaies`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Dataverse", error);
    throw error;
  }
};

export const fetchOccupations = async (
  pathway: string | undefined,
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_occupations?$filter=_cfa_pathway_value eq ${pathway}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Dataverse", error);
    throw error;
  }
};

export const fetchOccupationRelatedData = async (
  occupationId: string,
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_occupations(${occupationId})?$expand=cfa_advertisedwagetrend_Occupation,cfa_topjobpostingindustry_Occupation,cfa_topjobpostingsource_Occupation,cfa_jobpostingsregionalbreakdown_Occupation,cfa_experiencebreakdown_Occupation($select=cfa_experience,cfa_percentoftotal),cfa_topcompaniesposting_Occupation($select=cfa_topcompaniespostingid,cfa_company,cfa_medianpostingduration,_cfa_occupation_value,cfa_totalaug2023july2024,cfa_uniqueaug2023july2024),cfa_toppostedjobtitle_Occupation($select=cfa_jobtitle),cfa_toplightcastskill_Occupation($select=cfa_skill),cfa_educationbreakdown_Occupation`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching related data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching related data from Dataverse", error);
    throw error;
  }
};

export const fetchLightCastJobs = async (
  occupation_ONET_code: string | undefined,
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_lightcastjobs?$select=cfa_lightcastjobid,cfa_company,cfa_datestring,cfa_dateposted,cfa_description,cfa_location,cfa_name,cfa_onetcode,cfa_skills,cfa_url&$filter=startswith(cfa_onetcode,${occupation_ONET_code}) and statecode eq 0`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Dataverse", error);
    throw error;
  }
};

export const fetchCareerBridgeCIPSOCS = async (
  soc_code: string | undefined,
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_careerbridgecipsocs?$select=cfa_careerbridgecipsocid,cfa_cipcode,cfa_soccode&$filter=(cfa_soccode eq '${soc_code}')`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Dataverse", error);
    throw error;
  }
};

export const fetchCareerBridgeITPrograms = async (
  cip_code: string | undefined,
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cfa_careerbridgeitprograms?$select=cfa_careerbridgeitprogramid,cfa_awardtype,cfa_city,cfa_communitycollege,cfa_completers,cfa_county,cfa_isctc,cfa_link,cfa_programlength,cfa_programname,cfa_region,_cfa_schoolname_value,cfa_searchciptext&$filter=(cfa_searchciptext eq '${cip_code}')`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Dataverse", error);
    throw error;
  }
};
