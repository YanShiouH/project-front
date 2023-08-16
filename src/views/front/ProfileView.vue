<template>
  <v-layout style="height: 100%">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" :clipped="isMobile">
      <v-list-item :prepend-avatar="avatar" nav title="Welcome">
        <!-- <v-img :src="avatar"></v-img> -->
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account" title="Profile" value="profile"
          @click="selectedTab = 'profile'"></v-list-item>
        <v-list-item prepend-icon="mdi-history" title="My Activity" value="activity"
          @click="selectedTab = 'activity'"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 100%; overflow: auto;" @click.stop="rail = true">
      <v-container>
        <v-row v-show="selectedTab === 'profile'" class="max-width-835">
          <v-col>
            <h2 class="profile-title">Profile</h2>
            <h4 class="personal-info-title">Personal Information</h4>
            <v-col cols="12">
              <v-label class="info-label">Account</v-label><br>
              <input type="text" disabled :value="user.account" placeholder name="account" class="info-input">
            </v-col>
            <v-col cols="12">
              <v-label class="info-label">Email</v-label><br>
              <input type="text" disabled :value="user.email" placeholder name="email" class="info-input">
            </v-col>
          </v-col>
        </v-row>
        <v-row v-show="selectedTab === 'activity'" class="max-width-835">
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="text" style="border:rgba(0, 150, 136, 0.5) solid 1px;">
              <v-card-title>Liked Articles</v-card-title>
              <v-card-text>
                <span class="highlight-number">{{ user.profile[0]?.likedArticles?.length || 0 }}</span><br>
                articles liked</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="text" style="border:rgba(0, 150, 136, 0.5) solid 1px;">
              <v-card-title>Current Lesson</v-card-title>
              <v-card-text>
                <template v-if="user.profile[0] && user.profile[0].currentLesson !== null">
                  lesson<br>
                  <span class="highlight-number">{{ user.profile[0].currentLesson }}</span></template>
                <template v-else>
                  <p>Start your learning journey now! Choose a lesson to begin.</p>
                </template>
              </v-card-text>
              <!-- <v-card-text>
                lesson<br>
                <span class="highlight-number">{{ user.profile[0].currentLesson }}</span>
              </v-card-text> -->
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="text" style="border:rgba(0, 150, 136, 0.5) solid 1px;">
              <v-card-title>Posted Posts</v-card-title>
              <v-card-text>
                <span class="highlight-number">{{ user.profile[0]?.postedPosts?.length || 0 }}</span><br> posts posted
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
const user = useUserStore()

const { avatar } = storeToRefs(user)

const drawer = ref(true)

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
const rail = ref(isMobile.value)
const selectedTab = ref('profile')

</script>

<style scope lang="sass">
.highlight-number
  font-size: 48px
  font-weight: bold
  color: #FFD700
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)

.max-width-835
  max-width: 835px
  margin: 0 auto
.profile-title
  font-size: 24px
  color: #333
  margin-bottom: 10px

.personal-info-title
  font-size: 18px
  color: #666
  margin-bottom: 20px

.info-label
  font-weight: bold

.info-input
  width: 100%
  max-width: 300px
  padding: 8px
  border: 2px solid rgba(0, 0, 0, 0.1)
  border-radius: 4px
  font-size: 16px
  background-color: #f8f8f8
  color: #333
  margin-bottom: 10px
p
  height: 53px
</style>
