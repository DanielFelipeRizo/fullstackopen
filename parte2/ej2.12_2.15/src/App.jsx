import { useState, useEffect } from 'react'
import Country from './components/Country'
import FilterForName from './components/FilterForName'
import countryService from './services/countries'
import './index.css'

const App = () => {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
      .catch(err => console.log('error', err))
  }, [])

  const [filter, setFilter] = useState('')

  const handleInputFilterChange = (event) => setFilter(event.target.value)

  const handleButtonCleanClick = () => setFilter('');

  return (
    <div>
      <h2>Countries</h2>

      <FilterForName
        filter={filter}
        handleInputFilterChange={handleInputFilterChange}
        handleButtonCleanClick={handleButtonCleanClick}
      />

      <Country countries={countries}
        strFilter={filter}
      />
    </div>
  )
}

export default App