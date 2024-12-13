import {getCareerPrepAssessment, getCareerPrepStatus, getCareerPrepStudentDetailView, getCareerPrepStudentNotes, getMeetingByJobSeeker, NoteType } from "@/app/lib/admin/careerPrep";
import AddMeetingModal from "@/app/ui/components/careerPrep/AddMeetingModal";
import BasicModal from "@/app/ui/components/careerPrep/BasicModal";
import EnrollmentStatusDropDown from "@/app/ui/components/careerPrep/EnrollmentStatusDropDown";
import NoteContainer from "@/app/ui/components/careerPrep/NoteContainer";
import Tabs from "@/app/ui/components/Tabs";
import RecommendedTrackDropDown from "../../../../ui/components/careerPrep/RecommendedTrackDropDown";
import LikertRating from "@/app/ui/components/careerPrep/LikertRating";

export default async function page({ params }: { params: { id: string } }){
    const client = await getCareerPrepStudentDetailView(params.id);
    const careerPrepEnrollment = await getCareerPrepStatus(params.id);
    const notes = await getCareerPrepStudentNotes(params.id);
    const meetings = await getMeetingByJobSeeker(params.id);
    
    if(!client.data){
        return <div><h1>ERROR</h1></div>
    }
    return(
        <main className="space-y-3 pr-[100px] w-full">
            <div className="inline-flex"><h1 className="text-2xl">{client.data?.firstName} {client.data?.lastName} ({client.data?.pronouns})</h1><AddMeetingModal jsId={params.id}/></div>
            <h2><b>Status: </b><EnrollmentStatusDropDown careerPrepEnrollmentStatus={client.data?.prepEnrollmentStatus} jobseekerId={params.id}/></h2>
            <h2><b>Auto Recommended Track: </b>{careerPrepEnrollment?.AutoRecommendedTrack}</h2>
            <h2><b>Assigned Track: </b><RecommendedTrackDropDown jobseekerId={params.id} careerPrepTrack={careerPrepEnrollment?.AssignedTrack}/></h2>
            <h2><b>Expeceted Edu Completion: </b>{client.data.expectedEduCompletion}</h2>
            
            {/* <BasicModal buttonText="Add Meeting info"><p>texter</p></BasicModal> */}
            <h2><b>Assessment Date:</b>{client.data?.assessmentDate}</h2>
            <PrepAssesmentView id={params.id}/>
            <h2><b>Highest Level of Education:</b> {client.data?.education}</h2>
            <h2><b>Email address:</b> {client.data?.emailAddress}</h2>
            <h2><b>Pool:</b> {client.data?.poolAssignment}</h2>
            <h2><b>Linkedin:</b><a href={client.data?.linkedin}></a>{client.data?.linkedin}</h2>
            <h2><b>Pathway:</b> {client.data?.pathway}</h2>
            <h2><b>Technical Certificates:</b> {client.data?.technicalCertificates.map((c)=>`${c.name}, `)}</h2>
            <h2><b>Meetings:</b></h2>
            {meetings?.map((meeting)=>(<p key={meeting.id}>{meeting.title} {meeting.meetingDate.toLocaleString()}</p>))}
            <div className="">
                <Tabs tabs={
                [
                {label:"General Notes",content:<NoteContainer key="Gen" noteType={NoteType.GENERAL} jsId={params.id} notes={notes.generalNotes}/>},
                {label:"Meeting Notes",content:<NoteContainer key="Meet" noteType={NoteType.MEETING} jsId={params.id} notes={notes.meetingNotes}/>},
                {label:"Follow Up Notes",content:<NoteContainer key="Follow" noteType={NoteType.FOLLOWUP} jsId={params.id} notes={notes.followUpNotes}/> }
                ]}/>
            </div> 
        </main>
    );
}



/*
{
  jobseekerId: '1111c38e-0940-4979-b65b-e1a0578f744f',
  assessmentDate: 2024-12-06T20:34:21.786Z,
  interestPathway: 'Cybersecurity',
  pronouns: 'She/Her',
  expectedEduCompletion: 'N/A',
  experienceWithApplying: false,
  experienceWithInterview: false,
  prevWorkExperience: false,
  streetAddress: null,
  priorityPopulations: null,
  updatedAt: 2024-12-06T20:34:21.786Z,
  CybersecurityRating: [
    {
      jobseekerId: '1111c38e-0940-4979-b65b-e1a0578f744f',
      networking: 3,
      projectManagement: 3,
      securityTools: 3,
      operatingSystems: 3,
      programming: 3,
      cryptography: 3,
      cloudSecurity: 3,
      incidentResponse: 3,
      dataSecurity: 3,
      technicalSupport: 3,
      computationalThinking: 3,
      apiUsage: 3,
      updatedAt: 2024-12-06T20:34:21.896Z,
      overallAverage: 3
    }
  ],
  DataAnalyticsRating: [],
  ITCloudRating: [],
  SoftwareDevRating: [],
  DurableSkillsRating: [
    {
      jobseekerId: '1111c38e-0940-4979-b65b-e1a0578f744f',
      emotionManagement: 3,
      empathy: 3,
      goalSetting: 3,
      timeManagement: 3,
      adaptability: 3,
      criticalThinking: 3,
      creativity: 3,
      resilience: 3,
      communication: 3,
      activeListening: 3,
      conflictResolution: 3,
      nonverbalCommunication: 3,
      teamwork: 3,
      trustBuilding: 3,
      leadership: 3,
      perspectiveTaking: 3,
      culturalAwareness: 3,
      relationshipBuilding: 3,
      documentationSkills: 3,
      updatedAt: 2024-12-06T20:34:21.813Z,
      overallAverage: 3
    }
  ],
  BrandingRating: [
    {
      jobseekerId: '1111c38e-0940-4979-b65b-e1a0578f744f',
      personalBrand: 3,
      onlinePresence: 3,
      elevatorPitch: 3,
      resumeEffectiveness: 3,
      coverLetterEffectiveness: 3,
      interviewExperience: 3,
      responseTechnique: 3,
      followUpImportance: 3,
      onlineNetworking: 3,
      eventNetworking: 3,
      relationshipManagement: 3,
      jobSearchStrategy: 3,
      materialDistribution: 3,
      networkingTechniques: 3,
      onboardingBestPractices: 3,
      developmentPlan: 3,
      mentorship: 3,
      updatedAt: 2024-12-06T20:34:21.863Z,
      overallAverage: 3
    }
  ]
}
*/
async function PrepAssesmentView(params:{id:string}){
    const assessment = await getCareerPrepAssessment(params.id)
    return(
        <div>
            <div className="space-y-2">
  <b>Cyber Security:</b>
  {assessment?.CybersecurityRating?.map((c, index) => (
    <div key={`cybersecurity-${index}`}>
      <p>Overall Average (Cybersecurity): <LikertRating value={c.overallAverage ?? 0} /></p>
      <p>Networking: <LikertRating value={c.networking ?? 0} /></p>
      <p>Project Management: <LikertRating value={c.projectManagement ?? 0} /></p>
      <p>Security Tools: <LikertRating value={c.securityTools ?? 0} /></p>
      <p>Operating Systems: <LikertRating value={c.operatingSystems ?? 0} /></p>
      <p>Programming: <LikertRating value={c.programming ?? 0} /></p>
      <p>Cryptography: <LikertRating value={c.cryptography ?? 0} /></p>
      <p>Cloud Security: <LikertRating value={c.cloudSecurity ?? 0} /></p>
      <p>Incident Response: <LikertRating value={c.incidentResponse ?? 0} /></p>
      <p>Data Security: <LikertRating value={c.dataSecurity ?? 0} /></p>
      <p>Technical Support: <LikertRating value={c.technicalSupport ?? 0} /></p>
      <p>Computational Thinking: <LikertRating value={c.computationalThinking ?? 0} /></p>
      <p>API Usage: <LikertRating value={c.apiUsage ?? 0} /></p>
    </div>
  ))}

  <b>Data Analytics:</b>
  {assessment?.DataAnalyticsRating?.map((c, index) => (
    <div key={`dataanalytics-${index}`}>
      <p>Overall Average (Data Analytics): <LikertRating value={c.overallAverage ?? 0} /></p>
      <p>Data Analysis: <LikertRating value={c.dataAnalysis ?? 0} /></p>
      <p>Data Visualization: <LikertRating value={c.dataVisualization ?? 0} /></p>
      <p>SQL Programming: <LikertRating value={c.sqlProgramming ?? 0} /></p>
      <p>Python Packages: <LikertRating value={c.pythonPackages ?? 0} /></p>
      <p>Databases: <LikertRating value={c.databases ?? 0} /></p>
      <p>Big O Complexity: <LikertRating value={c.bigOComplexity ?? 0} /></p>
      <p>Project Management: <LikertRating value={c.projectManagement ?? 0} /></p>
      <p>Computational Thinking: <LikertRating value={c.computationalThinking ?? 0} /></p>
      <p>Machine Learning: <LikertRating value={c.machineLearning ?? 0} /></p>
    </div>
  ))}

<b>Durable Skills</b>
<div>
  {assessment?.DurableSkillsRating && (
    Object.entries(assessment.DurableSkillsRating[0] || {}) // Use first item in array
      .filter(([key, value]) => typeof value === 'number') // Filter only numeric values
      .map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label htmlFor={key} style={{ marginRight: '10px', textTransform: 'capitalize' }}>
            {key.replace(/([A-Z])/g, ' $1')}:
          </label>
          <LikertRating value={value as number}  />
        </div>
      ))
  )}
</div>
<b>IT Cloud</b>
<div>
  {assessment?.ITCloudRating && (
    Object.entries(assessment.ITCloudRating[0] || {}) // Use first item in array
      .filter(([key, value]) => typeof value === 'number') // Filter only numeric values
      .map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label htmlFor={key} style={{ marginRight: '10px', textTransform: 'capitalize' }}>
            {key.replace(/([A-Z])/g, ' $1')}:
          </label>
          <LikertRating value={value as number}  />
        </div>
      ))
  )}
</div>
<b>Software Dev</b>
<div>
  {assessment?.SoftwareDevRating && (
    Object.entries(assessment.SoftwareDevRating[0] || {}) // Use first item in array
      .filter(([key, value]) => typeof value === 'number') // Filter only numeric values
      .map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label htmlFor={key} style={{ marginRight: '10px', textTransform: 'capitalize' }}>
            {key.replace(/([A-Z])/g, ' $1')}:
          </label>
          <LikertRating value={value as number}  />
        </div>
      ))
  )}
</div>

<b>Branding Rating</b>
<div>
  {assessment?.BrandingRating && (
    Object.entries(assessment.BrandingRating[0] || {}) // Use first item in array
      .filter(([key, value]) => typeof value === 'number') // Filter only numeric values
      .map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label htmlFor={key} style={{ marginRight: '10px', textTransform: 'capitalize' }}>
            {key.replace(/([A-Z])/g, ' $1')}:
          </label>
          <LikertRating value={value as number}  />
        </div>
      ))
  )}
</div>




</div>

        </div>
    );
}