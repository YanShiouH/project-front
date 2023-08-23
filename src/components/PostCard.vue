<template>
  <router-link :to="'/discussion/' + _id" class="text-decoration-none">
    <v-card class="discussion-card">
      <v-card-title class="text-primary">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ content }}
      </v-card-text>
      <v-card-text>
        Poster: <b>{{ account }}</b><br>
        {{ new Date(date).toLocaleString('en-US') }}
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
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
  title: {
    type: String,
    default: () => ''
  },
  content: {
    type: String,
    default: () => ''
  }
})

</script>
<style scoped>
.discussion-card:hover {
  /* background-color: #f5f5f5; */
  /* Light gray background */
  box-shadow: inset 0px 2px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 150, 136, 0.5);
  /* Subtle shadow */
}
</style>
