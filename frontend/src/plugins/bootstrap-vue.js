import Vue from "vue";
import { LayoutPlugin, ButtonPlugin, NavbarPlugin, InputGroupPlugin, BTooltip, BSpinner, BModal, BFormFile } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(NavbarPlugin);
Vue.use(InputGroupPlugin);
Vue.component('b-tooltip', BTooltip)
Vue.component('b-spinner', BSpinner)
Vue.component('b-modal', BModal)
Vue.component('b-form-file', BFormFile)
