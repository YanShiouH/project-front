<template>
  <v-card>
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link :to="'/culture/' + _id" class="text-primary text-decoration-none">
        {{ title }}
      </router-link>
    </v-card-title>
    <!-- <v-card-subtitle>${{ price }}</v-card-subtitle> -->
    <v-card-text>
      <pre>{{ content }}</pre>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" prepend-icon="mdi-heart" @click="addCart">Collect</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'
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

const addCart = async () => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product: props._id,
      quantity: 1
    })
    user.cart = data.result
  } catch (error) {
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
