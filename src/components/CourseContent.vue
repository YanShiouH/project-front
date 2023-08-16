<template>
  <v-card class="card">
    <v-card-title>
      <!-- {{ content }} -->
      <div v-html="formattedContent" class="title-card"></div>
    </v-card-title>
    <v-card-actions>
      <v-btn icon="mdi-volume-medium" color="primary" @click="startSpeaking"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  content: {
    type: String,
    default: () => ''
  }
})

const audio = new Audio()
audio.src = new URL('/tts/' + props.content.split('<br>')[0], import.meta.env.VITE_API)

const startSpeaking = async () => {
  audio.play()
}

const formattedContent = computed(() => {
  return props.content.replace(/\n/g, '<br>')
})
</script>

<style scope lang="sass" src=".././assets/components/_courseContent.sass"></style>
