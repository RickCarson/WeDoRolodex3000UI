import { Autocomplete, TextField, Button } from '@mui/material';

export default function SearchBar({ contacts, filterCommand, refreshCommand }) 
{
    const filter = []
    
    contacts.map(contact => (
        filter.push({ label: contact.fullName, id: contact.id })
        ));

    const onFilter = (event, value) => {
        console.log(value);
        if (value === null)
            refreshCommand();
        else
            filterCommand(value.id);
    }

    return (
        <div className="PhoneBookSearchSection">
            <Autocomplete className="PhoneBookSearch"
                disablePortal
                id="combo-box-demo"
                options={filter}
                onChange={onFilter}
                renderInput={(params) => <TextField {...params} label="Search For Contact By Name" />}
            />
        </div>
    )
}