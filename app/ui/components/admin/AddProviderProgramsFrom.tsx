import { EduProviderPathways, PostEduProviderProgramDetailDTO, ReadEduProviderProgramCardDTO, ReadEduProviderProgramDetailDTO } from "@/app/lib/eduProviders";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import {programs, provider_programs } from "@prisma/client";

export default function AddProviderProgramsForm(props: { providerId: string }) {
    const blankFormData = {
        programName: "",
        logoUrl: "",
        eduProviderId: props.providerId,
        //eduProviderName: "",
        description: "",
        //locations: [],
        programLength: "",
        targetedJobRoles: [],
        about: "",
        tuition: "",
        fees: "",
        costSummary: "",
        locationType: null,
        getStartedUrl: "",
        faq: [],
        pathways: []
      }
  const [formData, setFormData] = useState<PostEduProviderProgramDetailDTO>(blankFormData);
  const [programList, setProgramList] = useState<(provider_programs&{Program:programs})[]>();
  const [selectedProgram, setSelectedProgram] = useState<provider_programs&{Program:programs}>()
  useEffect(()=>{
    fetch('/api/admin/edu-providers/'+props.providerId).then((e)=>{
      return e.json();
    }).then((res)=>{
      setProgramList(res)
    })
  },[]);
  useEffect(()=>{
    setFormData({
      "programName": selectedProgram?.Program.title??'',
      "logoUrl": formData.logoUrl,
      "eduProviderId": props.providerId,
      "description": selectedProgram?.description??'',
      "programLength": selectedProgram?.programLength??'',
      "targetedJobRoles": selectedProgram?.targetedJobRoles?.split(','),
      "about": selectedProgram?.about??'',
      "tuition": selectedProgram?.tuition??'',
      "fees": selectedProgram?.fees??'',
      "costSummary": selectedProgram?.costSummary??'',
      //"locationType": selectedProgram?.locationType??'',
      "getStartedUrl":selectedProgram?.getStartedUrl??'',
      "faq": JSON.parse(selectedProgram?.faq??'{}'),
      "pathways": selectedProgram?.pathways?.split('~') as EduProviderPathways[]
  })
  },[selectedProgram])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;
    try {
      const response = await fetch("/api/edu-providers/programs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Program successfully added!");
        setFormData(blankFormData)
      } else {
        alert("Failed to add program. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form className="border p-4 rounded" onSubmit={handleSubmit}>
      <legend className="text-xl font-bold mb-4">Add Programs</legend>
      <div className="grid grid-cols-1">
        <label htmlFor="company">Select Company</label>
        <select
          name='company'
          id='company'
          required
          onChange={(e) => {
            setSelectedProgram(programList?.find((p)=>(p.training_program_id == e.target.value)))
          }
        }
        >
          <option value={''}>--Please Select a Company--</option>
          {programList?.map((comp) => (
            <option key={comp.training_program_id} value={comp.training_program_id}>{comp.Program.title}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 mb-4">
        <label htmlFor="programName">Program Name *</label>
        <input
          type="text"
          id="programName"
          name="programName"
          required
          value={formData.programName}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <label htmlFor="logoUrl">Logo URL</label>
        <input
          type="url"
          id="logoUrl"
          name="logoUrl"
          value={formData.logoUrl}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <label htmlFor="programLength">Program Length</label>
        <input
          type="text"
          id="programLength"
          name="programLength"
          value={formData.programLength}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <label htmlFor="tuition">Tuition</label>
        <input
          type="text"
          id="tuition"
          name="tuition"
          value={formData.tuition}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <label htmlFor="fees">Fees</label>
        <input
          type="text"
          id="fees"
          name="fees"
          value={formData.fees}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <label htmlFor="costSummary">Cost Summary</label>
        <textarea
          id="costSummary"
          name="costSummary"
          value={formData.costSummary}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <label htmlFor="getStartedUrl">Get Started URL</label>
        <input
          type="url"
          id="getStartedUrl"
          name="getStartedUrl"
          value={formData.getStartedUrl}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="reset"
          variant="outlined"
          onClick={() =>
            setFormData({
              programName: "",
              logoUrl: "",
              eduProviderId: props.providerId,
              eduProviderName: "",
              description: "",
              locations: [],
              programLength: "",
              targetedJobRoles: [],
              about: "",
              tuition: "",
              fees: "",
              costSummary: "",
              locationType: null,
              getStartedUrl: "",
              faq: [],
              pathways: []
            })
          }
        >
          Reset Form
        </Button>
        <Button
          type="submit"
          endIcon={<ArrowCircleRightOutlined />}
          variant="contained"
        >
          Add Program
        </Button>
      </div>
    </form>
  );
}


