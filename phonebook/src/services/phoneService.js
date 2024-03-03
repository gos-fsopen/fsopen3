import axios from 'axios'

const baseUrl = '/api/persons'

const getPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => (response.data))
}
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
const updateNumber = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}
export default { getPeople, addPerson, remove, updateNumber }