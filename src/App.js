import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneBook from "./Pages/PhoneBook/PhoneBook"
import ToDo from "./Pages/ToDoList/ToDo"
import PostIts from "./Pages/PostIts/PostIts"
import { ApiGet } from "./Services/DataService";
import './App.css';

const contactsUrl = "https://localhost:7131/api/Contacts";

export default function App() {
  const [apiContacts, setApiContacts] = useState([])
  
  const refreshContactData = () => {
    ApiGet(contactsUrl).then(
      result => setApiContacts(result));
  }

  const RemoveContact = (contact) => {
    const newContactList = [...apiContacts];
    const index = newContactList.indexOf(contact);
    if (index > -1) {
        newContactList.splice(index, 1);
        setApiContacts(newContactList);
    }
  }

  const AddContact = (contact) => {
      const newContactList = [...apiContacts, contact];
      setApiContacts(newContactList);
  }

  const UpdateContact = (contact) => {
    const newContactList = [...apiContacts];
    const index = newContactList.indexOf(contact);
    if (index > -1) {
        newContactList.splice(index, 1, contact);
        setApiContacts(newContactList);
    }
  }

  const FilterContacts = (id) => {
    let filtered = apiContacts.filter((contact) => {
      return contact.id === id;
    });

    setApiContacts(filtered);
  }

  useEffect(() => {
    refreshContactData()
},[]);
  
return (
  <BrowserRouter>
    <Routes>
      <Route path="phonebook" element={<PhoneBook 
                                        contacts={apiContacts} 
                                        refreshCommand={refreshContactData} 
                                        removeCommand={RemoveContact} 
                                        addCommand={AddContact} 
                                        updateCommand={UpdateContact}
                                        filterCommand={FilterContacts}></PhoneBook>} />
        <Route path="postits" element={<PostIts />} />
        <Route path="todos" element={<ToDo />} />
        <Route path="*" element={<div>Page not found!! Try /phonebook</div>} />
    </Routes>
  </BrowserRouter>
)
}