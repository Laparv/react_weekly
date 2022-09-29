import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })

  },[])
  
  console.log('render', persons.length, 'persons')

  

  const addName = (event) => {
          event.preventDefault()
          const personObject = {
            name: newName,
            number: newNumber
          }
          const updateNumber = id => {
            const person = persons.find(x => x.id === id)
            const changedNumber = {...person, number: newNumber}
            console.log(changedNumber)
        
            personService
              .update(id,changedNumber)
              .then(updatedPerson => {
                setPersons(persons.map(x => x.id === id ? updatedPerson : x))
                setNewName('')
                setNewNumber('')
              })
          }

          if(persons.find(x => x.name === newName)) { 
            if(window.confirm(`${newName} is already in the phonebook. Update number?`)){
          
            updateNumber(persons.find(x => x.name === newName).id)}
           }
          else{
          personService
          .create(personObject)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNewName('')
            setNewNumber('')
          })
  }}
  
  const deleteName = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
    personService
    .remove(id)
    .then(() => {
      console.log('deletion succesfull')
      personService.getAll()
      .then(updatedList => {
        setPersons(updatedList)
      })
    })
  }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const namesToShow = persons.filter(x => x.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handleFilterChange= {handleFilterChange}/>
      <h2>Add contact</h2>
        <PersonForm 
          addName={addName} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} getDeleteIdAndName={deleteName}/>
    </div>
    
  )

}

export default App