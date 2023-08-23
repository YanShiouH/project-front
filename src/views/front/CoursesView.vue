<template>
  <v-container class="h-100">
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Courses</h1>
      </v-col>
      <!-- <v-divider></v-divider> -->
      <v-col cols="12" sm="6" lg="4" v-for="(course, index) in sliced" :key="course._id" data-aos="fade-down"
        data-aos-duration="600" :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <CourseCard v-bind="course" class="py-6"></CourseCard>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPages" size="20"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { api } from '@/plugins/axios'
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CourseCard from '@/components/CourseCard.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

const createSnackbar = useSnackbar()

const courses = ref([]);

(async () => {
  try {
    const { data } = await api.get('/courses')
    courses.value.push(...data.result)
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
const pageSize = ref(12)
const currentPage = ref(1)

const sliced = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return courses.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(courses.value.length / pageSize.value))
const calculateDelay = (index) => {
  return index * 50
}

</script>
