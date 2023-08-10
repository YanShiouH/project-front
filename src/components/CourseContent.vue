<template>
  <v-card>
    <v-card-title>
      {{ content }}
    </v-card-title>
    <v-card-actions>
      <v-btn icon="mdi-volume-medium" color="primary" @click="startSpeaking"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  content: {
    type: String,
    default: () => ''
  }
})

const audio = new Audio()
audio.src = new URL('/tts/' + props.content, import.meta.env.VITE_API)

const startSpeaking = async () => {
  audio.play()
}
</script>
