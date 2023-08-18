<template>
  <div>
    <v-overlay :opacity="1" :value="overlay">
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
  </div>
  <section class="video-section">
    <video class="responsive-video" src="../../assets/home.mp4" muted autoplay loop type="video/mp4">
    </video>
    <div class="text-center welcome text-white">
      <h1>Welcome to Taealam!</h1>
      <p>Start your journey to learn Arabic with us</p>
      <router-link :to="linkTo">
        <v-btn color="secondary">Get Started</v-btn>
      </router-link>
    </div>
  </section>
  <v-container class="features">
    <v-row class="max-width-1080">
      <v-col cols="12" sm="4">
        <v-sheet class="feature-sheet">
          <h2>Interactive Lessons</h2>
          <p>Engaging and interactive lessons to help you learn Arabic effectively.</p>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <h2>Cultural Insights</h2>
        <p>Explore the rich culture behind the Arabic language and traditions.</p>
      </v-col>
      <v-col cols="12" sm="4">
        <h2>Flexible Learning</h2>
        <p>Learn at your own pace and schedule, anytime, anywhere.</p>
      </v-col>
    </v-row>
  </v-container>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2023 Arabic Learning. All rights reserved.</p>
    </div>
  </footer>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

const user = useUserStore()
const overlay = ref(true)
const { isLogin } = storeToRefs(user)
const linkTo = computed(() => {
  return isLogin ? '/courses' : '/login'
})
onMounted(() => {
  setTimeout(() => {
    // Set overlay to false after your async action is done
    overlay.value = false
  }, 10000)
})
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
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

.features {
  padding: 40px;
  background-color: #f0f0f0;
}

.feature-sheet {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.feature-sheet:hover {
  transform: translateY(-4px);
}

.parallax-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.parallax-layer {
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  z-index: -1;
}

.parallax-image {
  height: 120%;
  /* Adjust this value for desired parallax effect */
  background-image: url('https://www.goodfreephotos.com/albums/united-arab-emirates/abu-dhabi/palace-court-at-abu-dhabi-united-arab-emirates-uae.jpg');
  background-size: cover;
  background-position: center;
  animation: parallaxScroll 10s linear infinite alternate;
}

@keyframes parallaxScroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10%);
  }
}

.features {
  padding: 40px;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
}

.feature {
  text-align: center;
  margin: 0 20px;
}

.feature h2 {
  font-size: 24px;
}

.feature p {
  font-size: 16px;
  color: #666;
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
</style>
