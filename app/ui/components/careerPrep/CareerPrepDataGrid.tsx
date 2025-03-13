"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import ViewResume from "./ViewResume";
import SelfAssignCaseButton from "./SelfAsignCaseButton";
import { CareerPrepStatus } from "@/app/lib/admin/careerPrep";
import { PoolCategories } from "@/app/lib/poolAssignment";
export interface CareerPrepGridData {
  jobseeker_id: string;
  first_name: string;
  last_name: string;
  email: string;
  careerPrepTrackRecommendation: string;
  "CP Enrollment Status": CareerPrepStatus;
  HighestEdLevel: string;
  "Pool Type": PoolCategories;
  "Pathway Title": string;
  JobseekerCreatedAt: Date;
  JobseekerUpdatedAt: Date;
  EnrollmentDate: Date;
  user_id: string;
}
export default function CareerPrepDataGrid({
  clients,
  ShowClaimButton,
}: {
  clients: CareerPrepGridData[];
  ShowClaimButton: boolean;
}) {
  const columns: GridColDef[] = [
    {
      field: "actions",
      sortable: false,
      headerName: "Actions",
      renderCell: (params) => (
        <Link
          href={`/career-prep/${params.id}`}
          className="LINK"
          target="_blank"
        >
          View Profile
        </Link>
      ),
    },
    {
      field: "resume",
      sortable: false,
      headerName: "Resume",
      renderCell: (params) => <ViewResume userId={params.row.user_id} />,
    },
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "email", headerName: "email", width: 200 },
    { field: "careerPrepTrackRecommendation", headerName: "track" },
    {
      field: "CP Enrollment Status",
      headerName: "CP Enrollment Status",
      width: 160,
    },
    { field: "HighestEdLevel", headerName: "HighestEdLevel", width: 160 },
    //{ field: "Pool Type", headerName: "Pool Type" },
    { field: "Pathway Title", headerName: "Pathway Title" },
    // { field: "JobseekerCreatedAt", headerName: "JobseekerCreatedAt" },
    // { field: "JobseekerUpdatedAt", headerName: "JobseekerUpdatedAt" },
    {
      field: "careerPrepAssessmentDate",
      headerName: "careerPrepAssessmentDate",
    },
    { field: "EnrollmentDate", headerName: "EnrollmentDate" },
  ];
  if (ShowClaimButton) {
    columns.unshift({
      field: "jobseeker_id",
      sortable: false,
      width: 75,
      headerName: "Claim",
      renderCell: (params) => (
        <SelfAssignCaseButton jobseekerId={params.row.jobseeker_id} />
      ),
    });
  }
  return (
    <Box>
      <DataGrid
        rows={clients}
        getRowId={(row: CareerPrepGridData) => row.jobseeker_id}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "EnrollmentDate", sort: "desc" }], // Default sort
          },
        }}
      />
    </Box>
  );
}
