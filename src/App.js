import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PhoneBook from "./Pages/PhoneBook/PhoneBook"
import ToDo from "./Pages/ToDoList/ToDo"
import PostIts from "./Pages/PostIts/PostIts"
import { ApiGet, ContactsUrl } from "./Services/DataService";
import './App.css';

export default function App() {
  const [apiContacts, setApiContacts] = useState([])
  
  const refreshContactData = () => {
    ApiGet(ContactsUrl).then(
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
        <Route path="*" element={<div>Page not found!! Try <Link to="/phonebook">Phone Book</Link></div>} />
    </Routes>
  </BrowserRouter>
)
}