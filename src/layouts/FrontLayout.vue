<template>
  <v-navigation-drawer v-if="isMobile" v-model="drawer" location="left" temporary>
    <v-list nav>
      <!-- 要修正 -->
      <v-list-item to="/admin"><v-avatar><v-img :src="avatar"></v-img></v-avatar></v-list-item>
      <template v-for="navItem in navItems" :key="navItem.to">
        <v-list-item v-if="navItem.show" :to="navItem.to">
          <template #prepend>
            <v-icon :icon="navItem.icon"></v-icon>
          </template>
          <v-list-item-title>{{ navItem.text }}</v-list-item-title></v-list-item>
      </template>
      <v-list-item v-if="isLogin" @click="logout">
        <template #prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>
        <v-list-item-title>Sign Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="primary">
    <v-container class="d-flex align-center">
      <v-btn to="/" selected-class="" :active="false">
        <v-app-bar-title>Taealam</v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
      <template v-if="!isMobile">
        <template v-for="navItem in navItems" :key="navItem.to">
          <v-btn variant="text" :prepend-icon="navItem.icon" :to="navItem.to" v-if="navItem.show">{{ navItem.text
          }}</v-btn>
        </template>
        <v-btn><v-avatar><v-img :src="avatar"></v-img></v-avatar></v-btn>
      </template>
      <v-btn v-if="!isMobile && isLogin" variant="text" prepend-icon="mdi-logout" @click="logout">Sign Out</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view :key="$route.path"></router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

const user = useUserStore()

const { isLogin, isAdmin, avatar } = storeToRefs(user)

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/courses', text: 'Courses', icon: '', show: isLogin.value },
    { to: '/culture', text: 'Culture Corner', icon: '', show: true },
    { to: '/discussion', text: 'Discussion Board', icon: '', show: true },
    { to: '/aboutus', text: 'About Us', icon: '', show: true },
    { to: '/admin', text: 'Admin', icon: 'mdi-cog', show: isLogin.value && isAdmin.value },
    { to: '/login', text: 'Log In', icon: 'mdi-login', show: !isLogin.value },
    { to: '/register', text: 'Sign Up', icon: 'mdi-account-plus', show: !isLogin.value }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: 'You have been logged out',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
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
}
</script>
