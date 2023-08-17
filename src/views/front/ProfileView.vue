<template>
  <v-layout class="h-100">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" :clipped="isMobile">
      <v-list-item :prepend-avatar="avatar" nav title="Welcome">
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
    <v-main class="h-100" @click.stop="rail = true">
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

                  <span class="highlight-number">{{ user.profile[0].currentLesson }}</span><br><span
                    class="text-white">lesson</span></template>
                <template v-else>
                  <p>Start your learning journey now! Choose a lesson to begin.</p>
                </template>
              </v-card-text>
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

<style scope lang="sass" src="../../assets/pages/_profile.sass">
</style>
