<template>
  <!-- <section style="overflow: hidden;"> -->
  <v-container style="height: calc(100% - 41px);">
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Culture Corner</h1>
      </v-col>
      <v-col cols="12" sm="6" lg="4" v-for="(cultureItem, index) in sliced" :key="cultureItem._id" data-aos="zoom-out"
        data-aos-duration="600" :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <CultureCard v-bind="cultureItem" class="culture-card"></CultureCard>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPages" size="20"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
  <!-- </section> -->
</template>

<script setup>
import { api } from '@/plugins/axios'
import { ref, onMounted, nextTick, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CultureCard from '@/components/CultureCard.vue'
import Footer from '@/components/footeR.vue'
import { gsap } from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

const createSnackbar = useSnackbar()

const culture = ref([])

onMounted(async () => {
  try {
    const { data } = await api.get('/culture')
    culture.value.push(...data.result)
    await nextTick()
    gsap.set('.culture-card', {
      boxShadow: '0 0 20px rgba(0,0,0,0.3)'
    })
    document.querySelectorAll('.culture-card').forEach((card, index) => {
      const tween = gsap.to(card, {
        y: -20,
        boxShadow: '0 30px 30px rgba(0,0,0,0.2)',
        paused: true,
        duration: 0.2,
        ease: 'none'
      })

      card.addEventListener('mouseenter', () => tween.play())
      card.addEventListener('mouseleave', () => tween.reverse())
    })
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
})
const pageSize = ref(15)
const currentPage = ref(1)

const sliced = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return culture.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(culture.value.length / pageSize.value))
const calculateDelay = (index) => {
  return index * 50
}
</script>
<style lang="sass" scoped>
h1
  font-size: 3rem

  .v-row
    margin: 0 !important
  .v-col
    margin: 0 !important
</style>
