<template>
  <v-card class="card">
    <v-card-title>
      <!-- {{ content }} -->
      <div v-html="props.content.split('<br>')[0]" class="title-card-arabic" dir="rtl"></div>
      <div v-html="props.content.split('<br>')[1]" class="title-card" dir="ltr"></div>
    </v-card-title>
    <v-card-actions>
      <v-btn icon="mdi-volume-medium" color="primary" @click="startSpeaking"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// import { defineProps } from 'vue'
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

</script>

<style scoped lang="sass" src=".././assets/components/_courseContent.sass"></style>
