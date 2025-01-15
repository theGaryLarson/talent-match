import { companies } from "@prisma/client";

export default function CompanyVerifyTable(props:{
    companies:companies[]
}){
    return(
        <div>
            {
                props.companies.map((company)=><div>{company.company_name}</div> )
            }
        </div>
    );
}