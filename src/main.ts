import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'
import App from './App.vue'
import router from './router'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
// Custom styles
import '@/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
	plugins: { Notify, Loading },
})

app.mount('#app')
