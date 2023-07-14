// import {
//   CContainer,
//   CNavbar
// } from '@coreui/vue'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

export default {
  // install: (app) => {
  //   app.component('CContainer', CContainer),
  //     app.component('CNavbar', CNavbar)
  // }
  install: (app) => {
    app.use(CoreuiVue)
    app.component('CIcon', CIcon)
  }
}