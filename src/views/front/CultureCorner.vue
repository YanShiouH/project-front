<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Culture Corner</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" sm="6" lg="4" v-for="cultureItem in culture" :key="cultureItem._id">
        <CultureCard v-bind="cultureItem"></CultureCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { api } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import CultureCard from '@/components/CultureCard.vue'

const createSnackbar = useSnackbar()

const culture = ref([]);

(async () => {
  try {
    const { data } = await api.get('/culture')
    culture.value.push(...data.result)
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
})()

</script>
<style lang="sass" scoped src="../../assets/pages/culture.sass">
</style>
