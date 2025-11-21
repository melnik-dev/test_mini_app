import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import '@/config/css/index.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/config/router/router.js'
import {useRequest} from '@/config/utils/request.js'
import {useFormatDate} from '@/config/utils/formatDate.js'
import Tgm from "@/config/presets/Tgm.js";
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app
    .use(createPinia())
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Tgm,
            options: {
                prefix: 'p',
                darkModeSelector: '.dark',
                cssLayer: {
                    name: 'primevue',
                    order: 'base, primevue',
                },
            }
        }
    })
    .use(ConfirmationService)
    .use(ToastService)
    .use(DialogService)
    .provide('useRequest', useRequest)
    .provide('useFormatDate', useFormatDate)
    .mount('#app')
