'use client'
import { userDataTable } from "@/app/lib/user";
import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridCellEditStopParams, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Role } from "@/data/dtos/UserInfoDTO";
import Alert from '@mui/material/Alert';
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
export default function EditUsersTable(params:{users:userDataTable[]}){
  const MultiSelect: GridColDef = {
    field: 'role',
    headerName: 'Roles',
    editable: true,
    width: 500,
    //renderCell:(params)=>(params.formattedValue),
    renderEditCell: (params) => {
      const currentRoles = params.value || []; // Handle cases where roles are undefined/null
      return (
        <Autocomplete
          fullWidth
          multiple
          options={Object.values(Role)}
          value={currentRoles}
          renderInput={(params) => (
            <TextField
              sx={{margin:0}}
              {...params}
              placeholder="Add roles"
            />
          )}
          onChange={(event, newValue) => {
            console.log(newValue)
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue, // Updates the roles array
            });
            try {
              fetch('/api/admin/user-management/roles/',{
                method:'POST',
                body:JSON.stringify({userId:params.id, newRoles:newValue})
              }).then((res)=>{
                console.log(res)
                if(!res.ok){
                  params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: params.value, // return to old value on failure to update
                  });
                }
              })
            } catch (error) {
              console.error("Falied to upate roles")
            }
          }}
        />
      );
    }
  };
     const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'first_name', headerName: 'First name', width: 130, editable: true,},
            { field: 'last_name', headerName: 'Last name', width: 130 },
            {field:'email', headerName:"email", width:200},
            MultiSelect,
            {field: 'zip', headerName:'zip'}
            
          ];
          const rows = params.users.map((user) => ({
            ...user,
            role: Array.isArray(user.role) ? user.role : user.role.split(','), // Ensure role is always an array
          }));
        
    return(
<Paper sx={{ height: 1000, width: '100%' }}>
    <h1 className="text-3xl">NOT CONNECTED TO BACKEND YET</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 100]}
          sx={{ border: 0 }}
          getRowId={(row) => row.id}
        />
      </Paper>
    );
}