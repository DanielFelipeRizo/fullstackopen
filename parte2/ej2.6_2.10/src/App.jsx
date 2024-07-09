import { useState } from 'react'
import ContactPersons from './components/ContactPersons'
import FilterForName from './components/FilterForName'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //sirve para saber si ya existe una propiedad del objeto proximo a agregar
  const validateUniqueProperty = (property, value) => persons.some(p => p[property] === value);

  const addContact = (event) => {
    event.preventDefault()

    const person = { name: newName, number: newNumber, id: persons.length + 1 }
    //console.log(validateUniqueName(person));
    if (validateUniqueProperty('name', newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    else if (validateUniqueProperty('number', newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    }
    else {
      //add contact
      setPersons(persons.concat(person));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleContactNameChange = (event) => setNewName(event.target.value)
  
  const handleContactNumberChange = (event) => setNewNumber(event.target.value)

  const handleInputFilterChange = (event) => setFilter(event.target.value)

  const handleButtonCleanClick = () => setFilter('');

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForName
        filter={filter}
        handleInputFilterChange={handleInputFilterChange}
        handleButtonCleanClick={handleButtonCleanClick}
      />

      <h2>Add a new</h2>

      <PersonForm
        addContact={addContact}
        persons={persons}
        newName={newName}
        handleContactNameChange={handleContactNameChange}
        newNumber={newNumber}
        handleContactNumberChange={handleContactNumberChange}
        validateUniqueProperty = {validateUniqueProperty}
      />

      <h2>Numbers</h2>
      <ContactPersons persons={persons} strFilter={filter} />
    </div>
  )
}

export default App