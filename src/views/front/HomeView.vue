<template>
  <vue-preloader @loading-is-over="showAnimation = false" :overflowActive="false" transition-type="fade-up"
    background-color="#fff" color="#FF6F61">
    <template v-slot="{ color, percent }">
      <transition name="loading-animation" mode="in-out">
        <div style="width: 90%;">
          <h1 class="text-center text-secondary">{{ percent > 100 ? 100 : percent }}%</h1>
          <div :style="{ backgroundColor: color, height: '5px', width: percent + '%' }"></div>
        </div>
      </transition>
    </template>
  </vue-preloader>
  <section class="video-section">
    <video class="responsive-video" src="../../assets/home.mp4" muted autoplay loop type="video/mp4">
    </video>
    <div class="text-center welcome text-white" data-aos="fade-right" data-aos-duration="2000">
      <h1>Welcome to Taealam!</h1>
      <p>Start your journey to learn Arabic with us</p>
      <v-btn color="secondary" size="large" :to="isLogin ? '/courses' : '/login'">Get Started</v-btn>
    </div>
  </section>
  <!-- <v-container class="features">
    <v-row class="max-width-1080">
      <v-col cols="12" sm="4">
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200"
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
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="400"
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
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="600"
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
  </v-container> -->
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2023 Taealam. All rights reserved.</p>
    </div>
  </footer>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { VuePreloader } from 'vue-preloader'
import '../../../node_modules/vue-preloader/dist/style.css'
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
<style scoped>
.video-section {
  position: relative;
}

.responsive-video {
  width: 100%;
}

.welcome {
  position: absolute;
  top: calc(50% - 48px);
  left: 0;
  width: 100%;
}

@media (min-width: 1440px) {
  .welcome {
    font-size: 2rem;
  }

  .welcome h1 {
    font-size: 3rem;
  }

  .welcome p {
    font-size: 1.5rem;
  }
}

.footer {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
  margin-top: -9px;
}

.footer-content {
  font-size: 14px;
}

.title {
  height: 64px;
  white-space: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}

.v-card-text {
  font-size: 1.2rem !important;
  line-height: 1.2;
  height: 85px;
}

@media (min-width:1280px) {
  .v-card-text {
    height: 85px !important;
  }

  .title {
    height: 32px;
  }
}

@media (min-width:600px) {
  .v-card-text {
    height: 132px;
  }
}
</style>
