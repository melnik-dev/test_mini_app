import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', () =>{
    const server = import.meta.env.VITE_URL_API

    return {server}
})