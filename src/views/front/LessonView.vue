<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Lesson {{ lessonNo }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" sm="3" md="2" xl="1" v-for="(item, index) in courseContent" :key="index">
        <CourseContent :content="item"></CourseContent>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { api } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CourseContent from '@/components/CourseContent.vue'
import { useRoute } from 'vue-router'

const createSnackbar = useSnackbar()
const route = useRoute()
const courseContent = ref([])
const lessonNo = ref('');
(async () => {
  try {
    const { data } = await api.get('/courses/' + route.params.id)
    console.log(data)
    lessonNo.value = data.result.lessonNo
    courseContent.value = [...data.result.content]
  } catch (error) {
    console.log(error)
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

</script>
