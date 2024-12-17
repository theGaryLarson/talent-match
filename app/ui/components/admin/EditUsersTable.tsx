'use client'
import { userDataTable } from "@/app/lib/user";
import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Role } from "@/data/dtos/UserInfoDTO";

const paginationModel = { page: 0, pageSize: 5 };
export default function EditUsersTable(params:{users:userDataTable[]}){
     const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'first_name', headerName: 'First name', width: 130},
            { field: 'last_name', headerName: 'Last name', width: 130 },
            {field:'email', headerName:"email", width:200},
            {field:'role', headerName:'roles', editable:true, width:200},
            {field: 'zip', headerName:'zip'}
            
          ];
    const rows = params.users
    return(
<Paper sx={{ height: 1000, width: '100%' }}>
    <h1 className="text-3xl">NOT CONNECTED TO BACKEND YET</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 100]}
          sx={{ border: 0 }}
          onCellEditStop={(params: GridCellParams, event: MuiEvent, details: GridCallbackDetails)=>{
            console.log("params", params);
            console.log("event", event);
            console.log('detials', details) 
          }}
        />
      </Paper>
    );
}