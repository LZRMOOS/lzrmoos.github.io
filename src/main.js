import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

require('@/assets/main.scss');

/* add icons to the library */
library.add(faInstagram)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')