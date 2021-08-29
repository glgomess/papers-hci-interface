import axios from 'axios'
const backendUrl = process.env.REACT_APP_BACKEND_URL
console.log('#####', backendUrl)
export const Backend = axios.create({ url: backendUrl })
