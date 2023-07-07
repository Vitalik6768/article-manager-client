import React from 'react';
import Avatar from '@mui/material/Avatar';
import DropDownChangeRole from '../components/DropDownChangeRole';
import DropDownChangeStatus from '../components/DropDownChangeStatus';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = (updateStatus, updateRole, deleteUser) =>[
    {
        name: "פעולות",
        selector: (row) => <DeleteIcon id='deleteIcon' onClick={() => deleteUser(row.id)}></DeleteIcon>,
      },
  
      {
        name: "סטטוס",
        selector: (row) => <DropDownChangeStatus onClick={updateStatus} id={row.id} status={row.status} />
      },
      {
        name: "תפקיד",
        selector: (row) => <DropDownChangeRole onClick={updateRole} id={row.id} status={row.role} />
      },
      {
        name: "מייל",
        selector: (row) => row.email,
      },
      {
        name: "שם משתמש",
        selector: (row) => row.name,
      },
      {
        name: "תמונה",
        selector: (row) => <Avatar src={`https://article-manager-api.onrender.com/images/${row.image}`} />,
      }

]

export default columns;
