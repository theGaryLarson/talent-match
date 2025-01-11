'use client'
import { companies } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page(){
    const [selectedCompany, setSelectedCompany] = useState();
    const [companies, setCompanies] = useState<companies[]>();
    const [companiesOptions, setCompaniesOptions] = useState();
    const [formData, setFormData] = useState();
    useEffect(
        ()=>{
            fetch('/api/companies/getall').then((res)=>{
                return res.json();
              }).then((jsonData)=>{
                setCompanies(jsonData);
              });
        },[]
    )
    return(
        <main>
            <div className="grid grid-cols-1">
        <label htmlFor="company">Select Company</label>
        <select name='company' id='company' required>
          <option value={''}>--Please Select a Company--</option>
          { 
            companies?.map((comp)=> <option key={comp.company_id} value={comp.company_id}>{comp.company_name}</option>)
          } 
        </select>
      </div>

        </main>
    );
}