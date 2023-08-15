<template>
  <v-card style="height: 100%">
    <v-layout style="height: 100%">
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" :clipped="isMobile">
        <v-list-item :prepend-avatar="avatar" nav>
          <!-- <v-img :src="avatar"></v-img> -->
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account" title="Profile" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-history" title="My Activity" value="home"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100%; overflow: auto;"></v-main>
    </v-layout>
  </v-card>
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
</script>

<style scope lang="sass">
</style>
