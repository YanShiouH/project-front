<template>
  <v-card>
    <v-img :src="image" cover height="200"></v-img>
    <v-card-title>
      <router-link :to="'/products/' + _id" class="text-primary text-decoration-none">
        {{ name }}
      </router-link>
    </v-card-title>
    <v-card-subtitle>${{ price }}</v-card-subtitle>
    <v-card-text>
      <pre>{{ description }}</pre>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" prepend-icon="mdi-cart">加入購物車</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  category: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  image: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  price: {
    type: Number,
    default: () => 0
  },
  sell: {
    type: Boolean,
    default: () => true
  }
})
</script>
