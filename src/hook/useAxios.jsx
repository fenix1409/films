import axios from "axios";
import { TOKEN, URL } from './useEnv'

export const useAxios = () => axios.create({
    baseURL: URL, headers: {
        "Authorization": `Bearer ${TOKEN}`
    }
})