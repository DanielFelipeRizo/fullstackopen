import countries from '../services/countries';
import countryService from '../services/countries'
import { useState, useEffect } from 'react';

const InformationCountry = ({ country }) => {

  const [weather, setWeather] = useState([])

  const arrLanguaje = Object.values(country.languages)

  const urlImage = country.flags.png;
  const altImage = country.flags.alt;
  const latlngCountry = country.capitalInfo.latlng;

  useEffect(() => {
    countryService
      .getWeatherInfo(latlngCountry)
      .then(res => {
        console.log(res.data.list[0].main.temp)
        setWeather(res.data.list)
      })
      .catch(err => console.log('error', err))
  }, [])

  if (weather.length == 0) return null
  else {
    const temperatureCelsiusCapital = Math.round((weather[0].main.temp - 273.15) * 100) / 100
    const wind = weather[0].wind.speed
    const codeIcon = weather[0].weather[0].icon
    const urlIcon = `https://openweathermap.org/img/wn/${codeIcon}@2x.png`

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <div>
          <h4>Languajes</h4>
          {arrLanguaje.map(l => <li key={l}> {l}</li>)}
        </div>
        <h3>Flag:</h3>
        <img src={urlImage} alt={altImage}></img>
        <br></br>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature: {temperatureCelsiusCapital} Celcius</p>
        <img src={urlIcon}></img>
        <p>wind {wind} m/s</p>
      </div>
    )
  }

}

export default InformationCountry