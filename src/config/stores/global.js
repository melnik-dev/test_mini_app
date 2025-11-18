import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', () =>{
    const inner_server = import.meta.env.VITE_INNER_URL_API
    const public_server = import.meta.env.VITE_PUBLIC_URL_API

    return {inner_server,public_server}
})