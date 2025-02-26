'use client'
import { CareerPrepJobseekerCardViewDTO } from "@/app/lib/admin/careerPrep";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const VISIBLE_FIELDS = ['title', 'company', 'director', 'year', 'cinematicUniverse'];
export default function CareerPrepDataGrid({clients}:{clients:CareerPrepJobseekerCardViewDTO[]}) {
  const data = clients
  // Otherwise filter will be applied on fields such as the hidden column id
  // const columns = React.useMemo(
  //   () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [data.columns],
  // );
  console.log(clients)
  //app date, name, status, email, pathway, education, resume, pool filter option by status
   const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "fname", width: 70 },
      { field: "lastName", headerName: "lname", width: 70 },
      {field:"careerPrepEnrollmentStatus", headerName:"status", width:70},
      { field: "assignedPool", headerName: "pool", width: 70 },
    ]

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={clients}
        getRowId={(row:CareerPrepJobseekerCardViewDTO)=>(row.jobseekerId)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}