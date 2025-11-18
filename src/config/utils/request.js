import axios from "axios";
import {useRouter} from "vue-router";
import {useAuth} from "@/config/stores/auth.js";

const public_server = import.meta.env.VITE_PUBLIC_URL_API // публичный
const inner_server = import.meta.env.VITE_INNER_URL_API // внутренний

export function useRequest() {
    const storeAuth = useAuth()
    const router = useRouter()

    return async (method, path, publ = false, formData, type = 'json') => {
        const server = publ ? public_server : inner_server

        try {
            const {data} = await axios({
                method,
                url: encodeURI(`${server}/${path}`),
                data: formData,
                headers: {Authorization: `Bearer ${storeAuth.getToken}`},
                responseType: type
            })
            if (data && data.err === 400) {
                console.warn('storeServer err 400', server)
                return false
            } else if (data && data.err === 401) {
                await router.replace('/')
                return false
            }
            return data
        } catch (error) {
            console.warn('Error', error.message)
            return false
        }
    }
}
