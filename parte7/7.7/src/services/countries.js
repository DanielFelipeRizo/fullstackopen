import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'


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


export default { getAll, getByName }
