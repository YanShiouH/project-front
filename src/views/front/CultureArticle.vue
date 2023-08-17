<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12" class="text-center">
        <h1>{{ culture.title }}</h1>
      </v-col>
      <v-col cols="12">
        <v-img :src="culture.image" :aspect-ratio="16 / 9"></v-img>
      </v-col>
      <v-col cols="12">
        <div v-html="formattedContent"></div>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay :model-value="!culture.publish" persistent class="align-center text-center justify-center">
    <h1 class="text-red">Article has been removed</h1>
    <v-btn to="/">Back</v-btn>
  </v-overlay>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

const route = useRoute()
const createSnackbar = useSnackbar()

const culture = ref({
  _id: '',
  title: '',
  content: '',
  image: '',
  publish: true,
  date: ''
});

(async () => {
  try {
    const { data } = await api.get('/culture/' + route.params.id)
    culture.value._id = data.result._id
    culture.value.title = data.result.title
    culture.value.content = data.result.content
    culture.value.image = data.result.image
    culture.value.publish = data.result.publish
    culture.value.date = data.result.date
    document.title = 'Taealam | ' + culture.value.title
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
})()

const formattedContent = computed(() => {
  const processedContent = culture.value.content
    .replace(/\n/g, '<br>')
  // .replace(/<b>/g, '<strong>')
  // .replace(/<\/b>/g, '</strong>')
  return processedContent
})
</script>
