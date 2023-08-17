<template>
  <v-card>
    <v-card-title class="text-center">
      Lesson {{ lessonNo }}: {{ topic }}
    </v-card-title>
    <v-card-text class="lesson-description">
      {{ description }}
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <router-link :to="'/courses/' + _id" class="text-primary text-decoration-none">
        <v-btn color="primary">Get Started</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  lessonNo: {
    type: String,
    default: () => ''
  },
  topic: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  publish: {
    type: Boolean,
    default: () => true
  },
  content: {
    type: Array,
    default: () => ['']
  }
})

</script>
<style scoped src=".././assets/components/_courseCard.sass"></style>
