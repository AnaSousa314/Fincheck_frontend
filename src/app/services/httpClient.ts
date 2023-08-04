import axios from "axios";

// const {} = await axios.post('http://localhost:3000/signin')

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})