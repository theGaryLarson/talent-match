"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { CareerPrepGridData } from "./NewCasesDataGrid";

export default function CareerPrepDataGrid({
  clients,
}: {
  clients: CareerPrepGridData[];
}) {
  const columns: GridColDef[] = [
    {
      field: "actions",
      sortable: false,
      headerName: "Actions",
      renderCell: (params) => (
        <Link href={`/career-prep/${params.id}`} className="LINK">
          View Details
        </Link>
      ),
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
    { field: "Pool Type", headerName: "Pool Type" },
    { field: "Pathway Title", headerName: "Pathway Title" },
    { field: "JobseekerCreatedAt", headerName: "JobseekerCreatedAt" },
    { field: "JobseekerUpdatedAt", headerName: "JobseekerUpdatedAt" },
    { field: "EnrollmentDate", headerName: "EnrollmentDate" },
  ];

  return (
    <Box>
      <DataGrid
        rows={clients}
        getRowId={(row: CareerPrepGridData) => row.jobseeker_id}
        //disableColumnFilter
        //disableColumnSelector
        //disableDensitySelector
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
