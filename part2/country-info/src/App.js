import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterCountries, setFilterCountries] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })

  }, [])


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCountries(event.target.value.toLowerCase())
  }
  
  const countriesToShow = countries.filter(x => x.name.official.toLowerCase().includes(filterCountries.toLowerCase()))

  return (
    <div>
      <Filter value={filterCountries} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} changeFilter={setFilterCountries}/>

    </div>
  )

}

export default App