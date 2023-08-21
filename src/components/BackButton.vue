<template>
  <div class="d-flex justify-center my-5"><v-btn @click="goBack" color="secondary">Back</v-btn></div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
