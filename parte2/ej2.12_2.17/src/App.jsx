import { useState, useEffect } from 'react'
import Contacts from './components/Contact'
import FilterForName from './components/FilterForName'
import ContactForm from './components/ContactForm'
import contactService from './services/contacts'
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [[message, type], setNotificationMessage] = useState([null, null])

  //sirve para saber si ya existe una propiedad del objeto proximo a agregar
  const validateUniqueProperty = (property, value) => contacts.some(p => p[property] === value);

  const addContact = (event) => {
    event.preventDefault()

    const contact = { name: newName, number: newNumber }

    if (validateUniqueProperty('name', newName)) {
      let userResponse = confirm(`${contact.name} is already added to phonebook, replace the old number with a new one?`);

      if (userResponse) {
        const contactRegistered = contacts.filter(p => p.name === newName)[0]
        contactRegistered.number = newNumber
        updateContact(contactRegistered)
      }
    }
    else if (validateUniqueProperty('number', newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    }
    else {
      //add contact
      contactService.create(contact)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setNewName('')
          setNewNumber('')
          setNotificationMessage([`Added '${returnedContact.name}'`, 'success'])
          setTimeout(() => { setNotificationMessage([null, null]) }, 3000)
        })
        .catch(error => {
          console.log(error)
          const errorMsj = error.response.data.error
          setNotificationMessage([errorMsj, 'error'])
        })
    }
  }

  const updateContact = (objectContact) => {
    const contactId = objectContact.id
    contactService.update(contactId, objectContact)
      .then(
        (res) => {
          if (res.status == 200) {
            setNotificationMessage([`Updated '${res.data.name}'`, 'success'])
            setContacts(contacts.map(c => c.id === contactId ? res.data : c))
            setTimeout(() => { setNotificationMessage([null, null]) }, 3000)
          }
        }
      ).catch(error => {
        console.log(error.response);
        setNotificationMessage([`the contact '${objectContact.name}' was already deleted from server`, 'error'])
        setTimeout(() => { setNotificationMessage([null, null]) }, 3000)
        setContacts(contacts.filter(c => c.id !== contactId))
      })
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    contactService.deleteContact(id)
      .then(
        (res) => {
          if (res.status == 204) {
            setContacts(contacts.filter(p => p.id !== id))
            setNotificationMessage([`deleted`, 'success'])
            setTimeout(() => { setNotificationMessage([null, null]) }, 2000)
          }
        }
      )
      .catch(error => {
        alert(`contact with id = '${id}' no exist`)
      })
  }

  const handleContactNameChange = (event) => setNewName(event.target.value)

  const handleContactNumberChange = (event) => setNewNumber(event.target.value)

  const handleInputFilterChange = (event) => setFilter(event.target.value)

  const handleButtonCleanClick = () => setFilter('');

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={type} />

      <FilterForName
        filter={filter}
        handleInputFilterChange={handleInputFilterChange}
        handleButtonCleanClick={handleButtonCleanClick}
      />

      <h2>Add a new</h2>

      <ContactForm
        addContact={addContact}
        contacts={contacts}
        newName={newName}
        handleContactNameChange={handleContactNameChange}
        newNumber={newNumber}
        handleContactNumberChange={handleContactNumberChange}
        validateUniqueProperty={validateUniqueProperty}
      />

      <h2>Numbers</h2>
      <Contacts contacts={contacts} strFilter={filter} deleteContact={deleteContact} />
    </div>
  )
}

export default App