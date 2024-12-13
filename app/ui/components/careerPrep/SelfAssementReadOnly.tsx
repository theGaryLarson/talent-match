import { getCareerPrepAssessment } from "@/app/lib/admin/careerPrep";
import BasicModal from "./BasicModal";
import LikertRating from "./LikertRating";

export default async function SelfAssementReadOnly(params:{id:string}){
    const assessment = await getCareerPrepAssessment(params.id)
    return(
        <div>
          <h1 className="text-xl font-bold"> Self Assessments Taken</h1>
            <div className="space-y-2">
              <AssessmentModal list={assessment?.BrandingRating} title={"Branding Rating"}/>
              <AssessmentModal list={assessment?.CybersecurityRating} title="Cyber Security"/>
              <AssessmentModal list={assessment?.DataAnalyticsRating} title="Data Analytics"/>
              <AssessmentModal list={assessment?.ITCloudRating} title="IT CLoud" />
              <AssessmentModal list={assessment?.SoftwareDevRating} title='Software Dev'/>
            </div>

        </div>
    );
}

function AssessmentModal({list, title}:{list:any[]|undefined, title:string}){
  return(
    (list != undefined && list.length > 0)?
      <BasicModal buttonText={title}>
        {
          <div className="h-[500px] flex flex-col flex-wrap">
            {
          Object.entries(list[0] || {}) // Use first item in array
            .filter(([key, value]) => typeof value === 'number') // Filter only numeric values
            .map(([key, value]) => (
              <div key={key} className="m-2.5">
                <label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}:
                </label>
                <LikertRating value={value as number}  />
              </div>
            ))
        }
        </div>}
      </BasicModal>:''
  )
}