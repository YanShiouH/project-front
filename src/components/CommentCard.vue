<template>
  <v-card>
    <v-card-text>
      {{ account }}
    </v-card-text>
    <v-card-text>
      <pre>{{ content }}</pre>
    </v-card-text>
    <v-card-text>
      {{ new Date(date).toLocaleString('en-US') }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()
const user = useUserStore()

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  account: {
    type: String,
    default: () => ''
  },
  date: {
    type: Date,
    default: () => ''
  },
  content: {
    type: String,
    default: () => ''
  }
})
// const isLiked = computed(() => {
//   return user.profile[0].likedArticles.some(
//     item => item.toString() === props._id)
// })
// const addLike = async () => {
//   try {
//     const { data } = await apiAuth.post('/users/like', {
//       culture: props._id
//     })
//     console.log(data)
//     user.profile = data.result
//     if (user.profile[0].likedArticles.some(
//       item => item.toString() === props._id)) {
//       createSnackbar({
//         text: 'Article liked!',
//         showCloseButton: false,
//         snackbarProps: {
//           timeout: 2000,
//           color: 'green',
//           location: 'bottom'
//         }
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     createSnackbar({
//       text: error.response.data.message,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'red',
//         location: 'bottom'
//       }
//     })
//   }
// }

</script>
