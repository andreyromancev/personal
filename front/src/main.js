import Vue from 'vue'
import VueSimpleSVG from 'vue-simple-svg'
import App from './app'

Vue.config.productionTip = false

Vue.use(VueSimpleSVG)

/* eslint-disable no-new */
new Vue({
    el: '.app',
    template: '<App/>',
    components: { App }
})
