<template>
  <v-container class="h-100">
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Lesson {{ lessonNo }}: {{ topic }}</h1>
      </v-col>
      <!-- <v-divider></v-divider> -->
      <v-col cols="12" sm="4" lg="3" v-for="(item, index) in courseContent" :key="index" data-aos="fade-down"
        data-aos-duration="400" :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <CourseContent :content="item"></CourseContent>
      </v-col>
    </v-row>
    <BtnBack></BtnBack>
  </v-container>
</template>
<script setup>
import { api, apiAuth } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CourseContent from '@/components/CourseContent.vue'
import BtnBack from '@/components/BackButton.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

const createSnackbar = useSnackbar()
const user = useUserStore()
const route = useRoute()
const courseContent = ref([])
const lessonNo = ref('')
const topic = ref('');

(async () => {
  try {
    const responses = await Promise.all([
      api.get('/courses/' + route.params.id),
      apiAuth.patch('/users/currentLesson', { _id: route.params.id })
    ])
    lessonNo.value = responses[0].data.result.lessonNo
    topic.value = responses[0].data.result.topic
    courseContent.value = [...responses[0].data.result.content]
    user.profile = responses[1].data.result
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
const calculateDelay = (index) => {
  return index * 50
}
</script>
<style lang="sass" scoped>
h1
  font-size:3rem
</style>
