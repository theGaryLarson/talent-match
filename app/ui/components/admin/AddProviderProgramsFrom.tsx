import { EduProviderPathways, LocationType, PostEduProviderProgramDetailDTO, ReadEduProviderProgramCardDTO, ReadEduProviderProgramDetailDTO } from "@/app/lib/eduProviders";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import {programs, provider_programs } from "@prisma/client";

export default function AddProviderProgramsForm(props: { providerId: string }) {
    const blankFormData:PostEduProviderProgramDetailDTO = {
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
      faq: [{ question: "", answer: "" }],
      pathways: [],
    }
  const [formData, setFormData] = useState<PostEduProviderProgramDetailDTO>(blankFormData);
  const [programList, setProgramList] = useState<(provider_programs&{Program:programs})[]>();
  const [selectedProgram, setSelectedProgram] = useState<provider_programs&{Program:programs}>()
  const [entries, setEntries] = useState<Entry[]>([{ question: "", answer: "" }]);
   // Helper function to validate the FAQ data structure
   const validateFAQ = (faq: unknown): Entry[] => {
    if (Array.isArray(faq)) {
      return faq.every(
        (item) => typeof item.question === "string" && typeof item.answer === "string"
      )
        ? (faq as Entry[])
        : [{ question: "", answer: "" }];
    }
    return [{ question: "", answer: "" }];
  };
  const refreshList = ()=>{
    fetch('/api/admin/edu-providers/'+props.providerId).then((e)=>{
      return e.json();
    }).then((res)=>{
      setProgramList(res)
    })
  }
  useEffect(refreshList,[]);
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
      "locationType": selectedProgram?.locationType as LocationType,
      "getStartedUrl":selectedProgram?.getStartedUrl??'',
      faq: validateFAQ(JSON.parse(selectedProgram?.faq ?? "[]")),
      "pathways": selectedProgram?.pathways?.split('~') as EduProviderPathways[]
  });
  setEntries(validateFAQ(JSON.parse(selectedProgram?.faq ?? "[]")));
  },[selectedProgram])
  useEffect(() => {
    setFormData((prev) => ({
      ...prev, // Spread existing formData first
      faq: entries, // Override the `faq` property with the `entries` array
    }));
  }, [entries]);
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
        refreshList();
      } else {
        alert("Failed to add program. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  const handleDelete = ()=>{

  }
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
        <label htmlFor="company">Select Program</label>
        <select
          name='company'
          id='company'
          onChange={(e) => {
            setSelectedProgram(programList?.find((p)=>(p.training_program_id == e.target.value)))
          }
        }
        >
          <option value={''}>--Please Select a Program--</option>
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
      <DynamicForm entries={entries} setEntries={setEntries}/>

      <div className="flex justify-between gap-4">
        {/* <Button
          type="reset"
          variant="outlined"
          onClick={() =>
            setFormData({
              trainingProgramId: selectedProgram?.training_program_id??'',
              programName: selectedProgram?.Program.title??'',
              logoUrl:'',
              eduProviderId: props.providerId,
              eduProviderName: '',
              description: "",
              locations: [],
              programLength: "",
              targetedJobRoles: [],
              about: "",
              tuition: "",
              programId:'',
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
        </Button> */}
        <div>
        {selectedProgram&&(
          <Button onClick={handleDelete}>Delete Program</Button>
        )}</div>
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


interface Entry {
  question: string;
  answer: string;
}

const DynamicForm = (props:{setEntries:Dispatch<SetStateAction<Entry[]>>, entries:Entry[]}) => {

  // Handle changes to the input fields
  const handleChange = (index: number, field: keyof Entry, value: string) => {
    const updatedEntries = props.entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    props.setEntries(updatedEntries);
  };

  // Add a new entry
  const addEntry = () => {
    props.setEntries([...props.entries, { question: "", answer: "" }]);
  };

  // Remove an entry
  const removeEntry = (index: number) => {
    props.setEntries(props.entries.filter((_, i) => i !== index));
  };

  console.log("eenn", props.entries)
  return (
    <div className="border">
      <h1>FAQs</h1>
      {props.entries.map((entry, index) => (
        <div key={index} className="grid grid-cols-3 p-2">
          <label>
            Question:
            <input
              type="text"
              value={entry.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              placeholder="Enter question"
              required
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              value={entry.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              placeholder="Enter answer"
              required
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <Button
            onClick={() => removeEntry(index)}
            disabled={props.entries.length === 1}
            variant="outlined"
            color="error"

          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        onClick={addEntry}
      >
        Add Another FAQ
      </Button>
    </div>
  );
};
