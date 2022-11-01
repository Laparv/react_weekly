import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  
  
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
            const person = persons.find(x => x._id === id)
            const changedNumber = {...person, number: newNumber}
            console.log(changedNumber)
            console.log(id)
        
            personService
              .update(id,changedNumber)
              .then(updatedPerson => {
                setPersons(persons.map(x => x.id === id ? updatedPerson : x))
                setNewName('')
                setNewNumber('')
              }).catch(error => {
                setPersons(persons.filter(n => n.id !== id))
                setMessage(`Update failed. Information of ${changedNumber.name} has been deleted from server`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
          }

          if(persons.find(x => x.name === newName)) { 
            if(window.confirm(`${newName} is already in the phonebook. Update number?`)){
          
            updateNumber(persons.find(x => x.name === newName)._id)
            personService.getAll().then(updatedList => {setPersons(updatedList)})
            setMessage(`Updated number for ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          
          }
          }
          else{
          personService
          .create(personObject)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`${newName} was added`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => 
            setMessage(`${error.response.data.error}`),
            setTimeout(() => {setMessage(null)}, 5000)
          )
  }}
  
  const deleteName = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      console.log(name, id)
    personService
    .remove(id)
    .then(() => {
      console.log('deletion succesfull')
      personService.getAll()
      .then(updatedList => {
        setPersons(updatedList)
        setMessage("Deleted contact")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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

  const namesToShow =  persons.filter(x => x.name.toLowerCase().includes(filterName.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handleFilterChange= {handleFilterChange}/>
        <Notification message={message}/>
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