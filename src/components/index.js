import Vue from 'vue'
import SzAlert from './SzAlert.vue'
import SzInput from './SzInput.vue'
import SzButton from './SzButton.vue'
import SzCard from './SzCard.vue'

/**
 * Только компоненты которые должны быть доступны глобально
 */
Vue.component(SzAlert.name, SzAlert)
Vue.component(SzInput.name, SzInput)
Vue.component(SzButton.name, SzButton)
Vue.component(SzCard.name, SzCard)
