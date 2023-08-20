<template>
  <section class="video-section">
    <video class="responsive-video" src="../../assets/home.mp4" muted autoplay loop type="video/mp4">
    </video>
    <div class="text-center welcome text-white" data-aos="fade-right" data-aos-duration="2000">
      <h1>Welcome to Taealam!</h1>
      <p>Start your journey to learn Arabic with us</p>
      <v-btn color="secondary" size="large" rounded="lg" :to="isLogin ? '/courses' : '/login'">Get Started</v-btn>
    </div>
  </section>
  <v-container class="features">
    <v-row class="max-width-1080">
      <v-col cols="12" sm="4">
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="80">mdi-school</v-icon>
            <h2 class="title">Interactive Lessons</h2>
          </v-card-title>
          <v-card-text>
            Engaging and interactive lessons to help you learn Arabic effectively.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn color="secondary" :to="isLogin ? '/courses' : '/login'" size="x-large">Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="400">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="80">mdi-forum</v-icon>
            <h2 class="title">Discussion Forum</h2>
          </v-card-title>
          <v-card-text>
            Join discussions and engage with other learners to enhance your Arabic skills.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn color="secondary" :to="'/discussion'" size="x-large">Join Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="feature-card" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="600">
          <v-card-title class="text-center">
            <v-icon color="secondary" size="80">mdi-earth</v-icon>
            <h2 class="title">Cultural Insights</h2>
          </v-card-title>
          <v-card-text>
            Explore the rich culture behind the Arabic language and traditions.
          </v-card-text>
          <v-card-actions class="justify-center d-flex">
            <v-btn color="secondary" :to="'/culture'" size="x-large">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2023 Taealam. All rights reserved.</p>
    </div>
  </footer>
</template>
<script setup>
// import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import { VuePreloader } from 'vue-preloader'

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
  height: auto;
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
  padding: 20px 0;
  text-align: center;
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
  height: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
