import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectMonth(props) {
    const [month, setMonth] = useState("");

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);
        props.onSelect(selectedMonth)
    };

    return (
        <div>
            <FormControl sx={{
                mt: 1,
                minWidth: '80%',
                maxWidth: 250,
                textAlign: { xs: 'center', sm: 'right' },
            }} size="small">
                <InputLabel id="demo-simple-select-helper-label">בחירת חודש</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={month}
                    label="בחירת חודש"
                    onChange={handleMonthChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>ינואר</MenuItem>
                    <MenuItem value={2}>פברואר</MenuItem>
                    <MenuItem value={3}>מרץ</MenuItem>
                    <MenuItem value={4}>אפריל</MenuItem>
                    <MenuItem value={5}>מאי</MenuItem>
                    <MenuItem value={6}>יוני</MenuItem>
                    <MenuItem value={7}>יולי</MenuItem>
                    <MenuItem value={8}>אוגוסט</MenuItem>
                    <MenuItem value={9}>ספטמבר</MenuItem>
                    <MenuItem value={10}>אוקטובר</MenuItem>
                    <MenuItem value={11}>נובמבר</MenuItem>
                    <MenuItem value={12}>דצמבר</MenuItem>
                </Select>

            </FormControl>
        </div>
    );
}

export default SelectMonth;