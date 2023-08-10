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
import { defineProps, ref } from 'vue'
import { useSpeechSynthesis } from '@vueuse/core'
import { api } from '@/plugins/axios'
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

// const content = ref(props.content)
// const { isPlaying, speak, stop } = useSpeechSynthesis(content, {
//   lang: 'ar-XA',
//   pitch: 1,
//   rate: 1,
//   volume: 1
// })

// const startSpeaking = () => {
//   console.log(content.value)
//   if (isPlaying.value) {
//     stop()
//   }
//   speak()
// }

// const synth = window.speechSynthesis
// const voices = synth.getVoices()
// console.log(voices)
</script>
