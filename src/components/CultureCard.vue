<template>
  <v-card>
    <v-card-actions class="justify-end">
      <v-btn :color="isLiked ? 'red' : 'primary'" @click="addLike" icon="mdi-heart"></v-btn>
    </v-card-actions>
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link :to="'/culture/' + _id" class="text-primary text-decoration-none">
        {{ title }}
      </router-link>
    </v-card-title>
    <v-card-text>
      <pre>{{ content }}</pre>
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
  title: {
    type: String,
    default: () => ''
  },
  content: {
    type: String,
    default: () => ''
  },
  image: {
    type: String,
    default: () => ''
  },
  publish: {
    type: Boolean,
    default: () => true
  }
})
const isLiked = computed(() => {
  if (!user.profile || !user.profile[0] || !user.profile[0].likedArticles) {
    return false
  }
  return user.profile[0].likedArticles.some(
    item => item.toString() === props._id)
})
const addLike = async () => {
  try {
    const { data } = await apiAuth.post('/users/like', {
      culture: props._id
    })
    user.profile = data.result
    if (user.profile[0].likedArticles.some(
      item => item.toString() === props._id)) {
      createSnackbar({
        text: 'Article liked!',
        showCloseButton: false,
        snackbarProps: {
          timeout: 10000,
          color: 'green',
          location: 'bottom'
        }
      })
    }
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error.response.data.message,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

</script>
