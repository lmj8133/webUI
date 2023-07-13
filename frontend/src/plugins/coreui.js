// import {
//   CContainer,
//   CNavbar
// } from '@coreui/vue'
import CoreuiVue from '@coreui/vue'

import '@coreui/coreui/dist/css/coreui.min.css'

export default {
  // install: (app) => {
  //   app.component('CContainer', CContainer),
  //     app.component('CNavbar', CNavbar)
  // }
  install: (app) => {
    app.use(CoreuiVue)
  }
}