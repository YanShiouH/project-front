/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Components
import { VDataTableServer } from 'vuetify/labs/VDataTable'

import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTableServer
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#009688',
          secondary: '#FF6F61',
          accent: '#FFD700'
        }
      }
    }
  }
  // locale: {
  //   locale: 'zhHant',
  //   messages: { zhHant }
  // }
})
