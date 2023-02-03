import React, { useState } from "react"
import SearchBar from "./Components/SearchBar"
import ContactList from "./Components/ContactList"
import { Button, Paper } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ApiPost, ApiPut } from '../../Services/DataService';

const ContactsUrl = "https://localhost:7131/api/Contacts/"

export default function PhoneBook({contacts, refreshCommand, removeCommand, addCommand, updateCommand, filterCommand}) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedContact, setSelectedContact] = useState({});

    const SetSelectedContact = (contact) => {
        setSelectedContact(contact);
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.emailAddresses[0].email);
        setPhoneNumber(contact.phoneNumbers[0].number);
        setNotes(contact.notes[0].notes);

        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleCancel = () => {
        setOpen(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setNotes('');
        selectedContact({});
    }
    
    const handleConfirm = () => {
        setOpen(false);

        const index = contacts.indexOf(selectedContact);
        if (index > -1) {
            let contactToEdit = selectedContact;
            contactToEdit.firstName = firstName;
            contactToEdit.lastName = lastName;
            contactToEdit.phoneNumbers[0].number = phoneNumber;
            contactToEdit.emailAddresses[0].email = email;
            contactToEdit.notes[0].notes = notes;
            setSelectedContact(contactToEdit);
            ApiPut(ContactsUrl, selectedContact);
            updateCommand(selectedContact);
        }
        else {
            let contactToAdd = {
                "firstName": firstName,
                "lastName": lastName,
                "title": "xx",
                "phoneNumbers": [
                    {
                    "number": phoneNumber,
                    "type": "Personal"
                    }
                ],
                "emailAddresses": [
                    {
                    "email": email,
                    "type": "personal"
                    }
                ],
                "notes": [
                    {
                    "notes": notes,
                    "type": "public"
                    }
                ]
            };

            ApiPost(ContactsUrl, contactToAdd);
            addCommand(contactToAdd);
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setNotes('');
        setSelectedContact({});
    };

    const firstNameChanges = (event) => {
        setFirstName(event.target.value);
    }
    
    const lastNameChanges = (event) => {
        setLastName(event.target.value);
    }

    const emailChanges = (event) => {
        setEmail(event.target.value);
    }

    const phoneNumberChanges = (event) => {
        setPhoneNumber(event.target.value);
    }

    const notesChanges = (event) => {
        setNotes(event.target.value);
    }

    return(
        <div className="App-Main">
        <Paper elevation={5} sx={{ margin: 5, maxWidth: '600px' }}>
            <div className="PhoneBookHeader">
                <ContactsIcon sx={{ fontSize: 40, marginRight: 5 }} />
                Phone Book App
            </div>
            <div className="PhoneBookSubHeader">
                Contacts
                <Button className="PhoneBookSubHeaderButton" variant="contained" onClick={handleClickOpen}>
                    + Add Contact
                </Button>
            </div>
            <div>
                <SearchBar contacts={contacts} filterCommand={filterCommand} refreshCommand={refreshCommand} />
            </div>
            <div className="ContactsSection">
                <ContactList contacts={contacts} removeCommand={removeCommand} selectContact={SetSelectedContact} />
            </div>
            <div>
                <Button sx={{ margin: 1 }} variant="contained"
                    onClick={refreshCommand}>
                    <RefreshIcon/> Refresh
                </Button>
            </div>

            <div>
                <Dialog open={open} onClose={handleCancel}>
                    <DialogTitle>Contact</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Add, Edit and View contact
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={firstName}
                        onChange={firstNameChanges}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={lastNameChanges}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={emailChanges}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phonenumber"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        variant="standard"
                        value={phoneNumber}
                        onChange={phoneNumberChanges}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="notes"
                        label="Notes"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={notes}
                        onChange={notesChanges}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCancel}>Cancel/Close</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Paper>
        </div>
    )
}