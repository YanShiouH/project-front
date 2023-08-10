<template>
  <v-card>
    <v-card-text>

    </v-card-text>
    <v-card-title>
      Lesson {{ lessonNo }}: {{ topic }}
    </v-card-title>
    <v-card-text>
      {{ description }}
    </v-card-text>
    <v-card-actions>
      <router-link :to="'/courses/' + _id" class="text-primary text-decoration-none">
        <v-btn color="primary">Get Started</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()
const user = useUserStore()

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  lessonNo: {
    type: String,
    default: () => ''
  },
  topic: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  publish: {
    type: Boolean,
    default: () => true
  },
  content: {
    type: Array,
    default: () => ['']
  }
})

</script>
