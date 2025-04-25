import { useState, useEffect } from "react"
import countryService from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  //console.log('name', name)

  useEffect(() => {
    countryService
      .getByName(name)
      .then(country => {
        setCountry(country)
        
      })
      .catch(err => console.log('error', err))
  }, [name])

  return country
}
