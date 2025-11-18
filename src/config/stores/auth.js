import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {useRequest} from "@/config/utils/request.js";

export const useAuth = defineStore('auth', () => {
    const request = useRequest()
    const user = ref({})
    const token = ref('')
    const modalAuth = ref({
        show: false,
        type: 'intro',
        role: 0 // 0 - заказчик, 1 - исполнитель
    })
    const modalConfirm = ref({
        show: false,
        type: 'confirm',
        role: 0,
    })
    async function setAuth(updateToken) {
        token.value = updateToken
        localStorage.setItem('userToken',updateToken)
        await setUser()
    }
    async function setUser() {
        const res = await request('GET', 'users/me/profile', false)
        if(res && res.err===200) {
            user.value = res.user
            localStorage.setItem('userData', JSON.stringify(res.user))
        }
    }
    function setModalRole(updateRole) {
        modalAuth.value.role = updateRole
    }
    function setModalConfirm(show, role) {
        modalConfirm.value.show = show
        modalConfirm.value.role = role
    }
    async function logout(){
        token.value = ''
        user.value = {}
        localStorage.removeItem('userToken')
        localStorage.removeItem('userData')
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
    const getModal = computed(() => {
        return modalAuth.value
    })
    const getModalConfirm = computed(() => {
        return modalConfirm.value
    })
    return { setAuth, setUser, setModalRole, setModalConfirm,
        logout, getUser, getToken, getModal, getModalConfirm, getUserRole, }
})