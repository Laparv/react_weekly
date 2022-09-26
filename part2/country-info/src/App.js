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
  
  console.log('render', countries.length, 'countries')


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCountries(event.target.value.toLowerCase())
  }
  
  const countriesToShow = countries.filter(x => x.name.official.toLowerCase().includes(filterCountries))

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} />

    </div>
  )

}

export default App