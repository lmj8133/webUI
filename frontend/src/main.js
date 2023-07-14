import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

import './plugins/coreui'


app.use(store)
app.use(router)

app.mount('#app')
