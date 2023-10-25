<template>
  <v-card variant="text" class="bgColor">
    <v-card-text>
      <b>{{ account }}</b><br>
      {{ content }}<br>
      {{ new Date(date).toLocaleString('en-US') }}
    </v-card-text>
  </v-card>
</template>

<script setup>
// import { defineProps } from 'vue'

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
  content: {
    type: String,
    default: () => ''
  }
})

</script>
<style scoped lang="sass" src=".././assets/components/_commentCard.sass">
  </style>
