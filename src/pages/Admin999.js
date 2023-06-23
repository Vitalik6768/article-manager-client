import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import UsersActions from '../components/UsersActions';

const Admin = () => {
    const [backendData, setBackEndData] = useState([]);
    useEffect(() => {
        getAllUsers();

        // Add any side effects you need here
    }, []);


    const columns = [
        { field: 'image', headerName: 'תמונה', width: 200, renderCell: (params) =><Avatar src={`http://localhost:5000/images/${params.row.image}`} />,
    sortable:false, filterable:false},
        { field: 'name', headerName: 'שם משתמש', width: 200 },
        { field: 'email', headerName: 'מייל', width: 200 },
        { field: 'role', headerName: 'תפקיד', width: 200, type:'singleSelect', valueOptions:['ADMIN', 'SEO_PROMOTER', 'SALES'], editable:true },
        { field: 'status', headerName: 'סטטוס', width: 200 },
        { field: 'id', headerName: 'id', width: 200 },
        { field: 'actions', headerName: 'פעולות', width: 200,renderCell: (params) =><UsersActions {...{params}}/> }
    ];


    async function getAllUsers() {
        const response = await fetch(`/admin/26/`);
        const data = await response.json();
        setBackEndData(data.users);
    
      }
      

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
                Manage Users
            </Typography>
            <DataGrid rows={backendData} columns={columns} getRowId={row=>row.id}  />
        </Box>
    );
};

export default Admin;