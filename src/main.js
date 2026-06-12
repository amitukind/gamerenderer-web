import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './composables/reveal'

import './assets/styles/fonts.css'
import './assets/styles/variables.css'
import './assets/styles/base.css'

const app = createApp(App)
app.directive('reveal', reveal)
app.mount('#app')
