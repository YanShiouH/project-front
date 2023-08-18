<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Discussion Board</h1>
      </v-col>
      <!-- <v-divider></v-divider> -->
      <v-col cols="12" v-if="isLogin" class="d-flex justify-end">
        <v-btn color="secondary" @click="openDialog">Add New Post</v-btn>
      </v-col>
      <v-col cols="12" v-for="(post, index) in sliced" :key="post._id" data-aos="fade-down" data-aos-duration="1200"
        :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <PostCard v-bind="post"></PostCard>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPages" size="20"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog persistent v-model="dialog" width="500px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>Add New Post</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title.value.value"
            :error-messages="title.errorMessage.value"></v-text-field>
          <v-textarea label="Content" v-model="content.value.value"
            :error-messages="content.errorMessage.value"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog" :loading="isSubmitting">Cancel</v-btn>
          <v-btn color="primary" type="submit" :loading="isSubmitting">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { apiAuth, api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import PostCard from '@/components/PostCard.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

const user = useUserStore()

const { isLogin } = storeToRefs(user)

const createSnackbar = useSnackbar()
const posts = ref([]);

(async () => {
  try {
    const { data } = await api.get('/discussion')
    const sortedData = data.result.sort((a, b) => new Date(b.date) - new Date(a.date))
    posts.value.push(...sortedData)
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

// 表單對話框
const dialog = ref(false)
const dialogId = ref('')
const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
}

// 表單
const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    content: ''
  }
})
const title = useField('title')
const content = useField('content')

const submit = handleSubmit(async (values) => {
  try {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('content', values.content)
    formData.append('date', new Date().toISOString())

    await apiAuth.post('/discussion', formData)
    createSnackbar({
      text: 'Submitted successfully',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    closeDialog()
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
})

const pageSize = ref(5)
const currentPage = ref(1)

const sliced = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return posts.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(posts.value.length / pageSize.value))

const calculateDelay = (index) => {
  return index * 200
}
</script>
