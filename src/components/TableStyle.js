const tableCustomStyles = {
    table: {
        style: {
            marginBottom: '150px',
            
           
        },
    },

    rows: {
        style: {
            minHeight: '50px', // override the row height
            overflow: 'visible'
           
           
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            justifyContent: 'center',
            fontSize:'15px'
  
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            justifyContent: 'center',
            overflow: 'visible'
            
        },
    },
  };
  export { tableCustomStyles };