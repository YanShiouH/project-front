<template>
  <v-navigation-drawer permanent="">
    <v-list>
      <v-list-item :prepend-avatar="user.image === undefined ? avatar : user.image" :title="account"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="navItem in navItems" :key="navItem.to" :to="navItem.to" :title="navItem.title"
        :prepend-icon="navItem.icon"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const user = useUserStore()
const { avatar, account } = storeToRefs(user)

const navItems = [
  { to: '/admin/courses', title: 'Courses', icon: 'mdi-bookshelf' },
  { to: '/admin/culture', title: 'Culture Corner', icon: 'mdi-mosque' },
  { to: '/admin/discussion', title: 'Discussion Board', icon: 'mdi-message-outline' },
  { to: '/', title: 'Home', icon: 'mdi-home' }
]
</script>
