<template>
  <v-navigation-drawer v-if="isMobile" v-model="drawer" location="left" temporary>
    <v-list nav>
      <template v-for="navItem in navItems" :key="navItem.to">
        <v-list-item v-if="navItem.show" :to="navItem.to">
          <template #prepend>
            <v-icon :icon="navItem.icon"></v-icon>
          </template>
          <v-list-item-title>{{ navItem.text }}</v-list-item-title></v-list-item></template>
      <v-list-item v-if="isLogin" @click="logout">
        <template #prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>
        <v-list-item-title>登出</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="primary">
    <v-container class="d-flex align-center">
      <v-btn to="/" selected-class="" :active="false">
        <v-app-bar-title>購物網</v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
      <template v-if="!isMobile">
        <template v-for="navItem in navItems" :key="navItem.to">
          <v-btn variant="text" :prepend-icon="navItem.icon" :to="navItem.to" v-if="navItem.show">{{ navItem.text
          }}<v-badge color="success" content="10" floating v-if="navItem.to === '/cart'"></v-badge></v-btn>
        </template></template>
      <v-btn v-if="!isMobile && isLogin" variant="text" prepend-icon="mdi-logout" @click="logout">登出</v-btn>
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
const { isLogin, isAdmin } = storeToRefs(user)

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin.value },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin.value },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: isLogin.value },
    { to: '/orders', text: '訂單', icon: 'mdi-format-list-numbered', show: isLogin.value },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: isLogin.value && isAdmin.value }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
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
