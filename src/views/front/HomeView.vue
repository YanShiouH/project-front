<template>
  <vue-preloader @loading-is-over="showAnimation = false" :overflowActive="false" transition-type="fade-up"
    background-color="#fff" color="#FF6F61">
    <template v-slot="{ color, percent }">
      <transition name="loading-animation" mode="in-out">
        <div style="width: 30%;">
          <h4 class="text-center text-secondary">{{ percent > 100 ? 100 : percent }}%</h4>
          <div :style="{ backgroundColor: color, height: '3px', width: percent + '%' }"></div>
        </div>
      </transition>
    </template>
  </vue-preloader>
  <section class="video-section">
    <video class="responsive-video" src="../../assets/home.mp4" muted autoplay loop type="video/mp4">
    </video>
    <div class="welcome" data-aos="fade-right" data-aos-duration="600" data-aos-delay="1500">
      <h1>Welcome to Taealam!</h1>
      <p class="my-2">Start your journey to learn Arabic with us</p>
      <v-btn color="secondary" size="large" :to="isLogin ? '/courses' : '/login'">Get Started</v-btn>
    </div>
  </section>
  <v-container class="py-16 my-16">
    <v-row class="max-width-1080">
      <v-col cols="12" class="text-center">
        <h1>Journey into Arabic</h1>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="h-100 pa-6 d-flex flex-column" data-aos="fade-down" data-aos-duration="600" data-aos-delay="200"
          data-aos-offset="-50">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="60">mdi-school</v-icon>
            <h2 class="title">Interactive Lessons</h2>
          </v-card-title>
          <v-card-text>
            Engaging and interactive lessons to help you learn Arabic effectively.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn variant="elevated" color="secondary" :to="isLogin ? '/courses' : '/login'">Learn
              More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="h-100 pa-6 d-flex flex-column" data-aos="fade-down" data-aos-duration="600" data-aos-delay="400"
          data-aos-offset="-50">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="60">mdi-forum</v-icon>
            <h2 class="title">Discussion Forum</h2>
          </v-card-title>
          <v-card-text>
            Join discussions and engage with other learners to enhance your Arabic skills.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn variant="elevated" color="secondary" :to="'/discussion'">Join Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="h-100 pa-6 d-flex flex-column" data-aos="fade-down" data-aos-duration="600" data-aos-delay="600"
          data-aos-offset="-50">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="60">mdi-earth</v-icon>
            <h2 class="title">Cultural Insights</h2>
          </v-card-title>
          <v-card-text>
            Explore the rich culture behind the Arabic language and traditions.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn variant="elevated" color="secondary" :to="'/culture'">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid style="background-color: rgba(0,150,136,0.2);">
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column order-md-0 order-1 pa-md-16 pa-6">
        <h1 class="text-center my-6">Embrace the Beauty of Arabic</h1>
        <p>With 420 million speakers globally, Arabic connects cultures through language and heritage. Beyond words, it
          reveals the art, stories, and traditions of the Arab world. Dive into the elegance of Arabic culture,
          enhancing global understanding and unlocking a vibrant language.</p>
      </v-col>
      <v-col cols="12" md="6" class="order-0 order-md-1" data-aos="fade-left" data-aos-duration="600" data-aos-delay="800"
        data-aos-offset="-50">
        <v-img src="../../assets/explore.png" class="copyImage"></v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="parallax"></v-container>
  <v-container fluid style=" background-color: rgba(0,150,136,0.2);">
    <v-row>
      <v-col cols="12" md="6" data-aos="fade-right" data-aos-duration="600" data-aos-delay="800" data-aos-offset="-50">
        <v-img src="../../assets/language.png" class="copyImage"></v-img></v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column pa-md-16 pa-6">
        <h1 class="text-center my-6">Explore Arabic's Language Magic</h1>
        <p>Arabic learning offers more than words. Mastering Arabic simplifies understanding dialects like Farsi,
          Turkish, Urdu, and Hebrew due to shared vocabularies. Dive into linguistic connections and access different
          languages with ease, adding a touch of language magic to your journey.</p>
      </v-col></v-row></v-container>
  <v-container fluid class="parallax"></v-container>
  <v-container fluid style="background-color: rgba(0,150,136,0.2);" class="pb-16">
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column order-md-0 order-1 pa-md-16 pa-6">
        <h1 class="text-center my-6">Connect Cultures: Learn Arabic</h1>
        <p>Arabic learning promotes cultural harmony. While abroad, you embody a cross-cultural ambassador, dispelling
          stereotypes and fostering understanding. Embrace Arabic to bridge cultures and deepen connections in a diverse
          world, endorsed by Warwick University's Language Center.</p>
      </v-col>
      <v-col cols="12" md="6" class="order-0 order-md-1" data-aos="fade-left" data-aos-duration="600" data-aos-delay="800"
        data-aos-offset="-50">
        <v-img src="../../assets/harmony.png" class="copyImage"></v-img>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { VuePreloader } from 'vue-preloader'
import Footer from '@/components/footeR.vue'
const showAnimation = ref(true)
onMounted(() => {
  setTimeout(() => {
    showAnimation.value = false
  }, 3000)
})
AOS.init()

const user = useUserStore()

const { isLogin } = storeToRefs(user)

</script>
<style scoped lang="sass" src="../../assets/pages/_home.sass">
</style>
