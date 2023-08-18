<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Culture Corner</h1>
      </v-col>
      <!-- <v-divider></v-divider> -->
      <v-col cols="12" sm="6" lg="4" v-for="cultureItem in culture" :key="cultureItem._id">
        <CultureCard v-bind="cultureItem" class="culture-card"></CultureCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { api } from '@/plugins/axios'
import { ref, onMounted, nextTick } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CultureCard from '@/components/CultureCard.vue'
import { gsap } from 'gsap'

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
        y: -30,
        boxShadow: '0 30px 30px rgba(0,0,0,0.2)',
        paused: true,
        duration: 0.5,
        ease: 'back.inOut(5)'
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

</script>

<style scope lang="sass" src="../../assets/pages/_cultureCorner.sass"></style>
