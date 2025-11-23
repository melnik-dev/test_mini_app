import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {useRequest} from "@/config/utils/request.js";

export const useAuth = defineStore('auth', () => {
    const request = useRequest()
    const user = ref({})
    const token = ref('')

    async function setAuth(updateToken) {
        token.value = updateToken
        await setUser()
    }
    async function setUser() {
        const res = await request('GET', 'user')
        if(res && res.err===200) {
            user.value = res.user
        }
    }
    async function login(user){
        user.value = user
        const res = await request('POST', 'auth/login', {
            user: user
        })
        if(res && res.err===200) {
            user.value = user
        }
    }
    async function logout(){
        token.value = ''
        user.value = {}
    }
    const getToken = computed(() => {
        return token.value
    })
    const getUser = computed(() => {
        return user.value
    })
    const getUserRole = computed(() => {
        return user.value.role
    })
    return { setAuth, setUser, logout, getUser, getToken, getUserRole, login }
})