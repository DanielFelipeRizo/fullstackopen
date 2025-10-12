import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

// const getAll = () => {
//     const request = axios.get(`${baseUrl}/all`)
//     //console.log('desde el servicio')
//     return request.then(response => response.data)
// }

const getAll = async () => {
    try {
        const response = await axios.get(`${baseUrl}/all`)
        console.log('response', response)
        return response.data
    } catch (error) {
        console.error('Error fetching countries:', error)
        throw error
    }
}


const getByName = async (contryName) => {
    try {
        // console.log('nombre', contryName)
        const response = await axios.get(`${baseUrl}/name/${contryName}`)
        // console.log('response', response.data)
        return response
    } catch (error) {
        console.error('Error fetching country:', error)
        return null
        // throw error
    }
}
// const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response)
// }

// const deleteC = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response)
// }

const getWeatherInfo = (latlngCountry) => {

    const api_key = import.meta.env.VITE_SOME_KEY_OPEN_WEATHER_MAP
    // console.log(api_key);

    const latitude = latlngCountry[0]
    const longitude = latlngCountry[1]

    const request = axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`)

    return request.then(response => response)
}

export default { getAll, getWeatherInfo, getByName }
