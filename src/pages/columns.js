import React from 'react';
import EditModel from '../components/EditModel';
import DropDownButton from '../components/DropDownButton';


const columns = (updateData, updateStatus) => [
    {
      name: 'פעולות',
      selector: (row) => (
        <EditModel
          onSubmit={updateData}
          id={row.id}
          client_name={row.client_name}
          article_name={row.article_name}
          contractor={row.contractor}
          article_type={row.article_type}
        />
      ),
    },
    {
      name: 'תאריך',
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      name: 'סטטוס',
      selector: (row) => (
        <DropDownButton onClick={updateStatus} id={row.id} status={row.status} />
      ),
    },
    {
      name: 'מחיר',
      selector: (row) => row.price.toFixed(1),
    },
    {
      name: 'סוג המאמר',
      selector: (row) => row.article_type,
    },
    {
      name: 'ספק',
      selector: (row) => row.contractor,
    },
    {
      name: 'שם המאמר',
      selector: (row) => row.article_name,
    },
    {
      name: 'שם לקוח',
      selector: (row) => row.client_name,
    },
  ];
  
  export default columns;