import * as React from 'react';
import { useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ApiDelete } from '../../../Services/DataService';

const deleteUrl = "https://localhost:7131/api/Contacts/"

export default function ContactList({contacts, removeCommand, selectContact}) {

    const onClickDelete = (contact) => {
        console.log("Deleting {contact.id}");
        const result = ApiDelete(deleteUrl + contact.id);
        console.log(result);

        removeCommand(contact);
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
            contacts.map(contact => (
                <div className="ClickableListItem">
                    <ListItem alignItems="flex-start" key={contact.id} onClick={() => {selectContact(contact)}}>
                        <ListItemAvatar>
                            <Avatar alt={contact.fullName} src="/willcomefromapieventyally.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={contact.fullName}
                            secondary={contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].type + ' ' + contact.phoneNumbers[0].number}
                        />
                        <IconButton edge="end" aria-label="delete" onClick={() => { onClickDelete(contact); }} >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))
        }
        </List>
      );
    
}
