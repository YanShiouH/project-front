<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Lesson {{ lessonNo }}: {{ topic }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" sm="4" md="2" v-for="(item, index) in courseContent" :key="index">
        <CourseContent :content="item"></CourseContent>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { api, apiAuth } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CourseContent from '@/components/CourseContent.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const createSnackbar = useSnackbar()
const user = useUserStore()
const route = useRoute()
const courseContent = ref([])
const lessonNo = ref('')
const topic = ref('');
(async () => {
  try {
    const { data } = await api.get('/courses/' + route.params.id)
    lessonNo.value = data.result.lessonNo
    topic.value = data.result.topic
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
})();
(async () => {
  try {
    const { data } = await apiAuth.patch('/users/currentLesson', { _id: route.params.id })
    user.profile = data.result
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

<style lang="sass" scoped src="../../assets/pages/courseEach.sass">
</style>
