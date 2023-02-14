import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
import 'vant/lib/index.css'
import './assets/common.scss'
const app = createApp(App)

const rootValue = 16
const rootwidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = deviceWidth * rootValue / rootwidth + 'px'

app.use(createPinia())
app.use(router)

app.mount('#app')
