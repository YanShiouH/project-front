<template>
  <v-container style="height: calc(100% - 41px);">
    <v-row class="max-width-1080">
      <v-col cols="12">
        <h1 class="text-center">Discussion Board</h1>
      </v-col>
      <!-- <v-divider></v-divider> -->
      <v-col cols="12" v-if="isLogin" class="d-flex justify-end">
        <v-btn color="secondary" @click="openDialog">Add New Post</v-btn>
      </v-col>
      <v-col cols="5" sm="8" lg="9">
        <v-text-field v-model="searchQuery" placeholder="Search..." append-inner-icon="mdi-magnify" variant="filled"
          density="compact" @click:append-inner="setfilter(searchQuery)" @keydown.enter="setfilter(searchQuery)">
        </v-text-field>
      </v-col>
      <v-col cols="7" sm="4" lg="3" class="d-flex justify-end">
        <v-btn-toggle v-model="toggle" divided variant="outlined">
          <v-btn variant="outlined">Newest</v-btn>
          <v-btn variant="outlined">Popular</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" v-for="(post, index) in filteredSlicedItems" :key="post._id" data-aos="fade-down"
        data-aos-duration="600" :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <PostCard v-bind="post"></PostCard>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPages" size="20"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
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
          <v-btn color="primary" type="submit" :loading="isSubmitting" variant="elevated">Submit</v-btn>
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
import Footer from '@/components/footeR.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()
const user = useUserStore()
const { isLogin } = storeToRefs(user)
const createSnackbar = useSnackbar()
const posts = ref([])
const toggle = ref(0);
(async () => {
  try {
    const { data } = await api.get('/discussion')
    console.log(data)
    const sortedData = data.result.sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log(sortedData)
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

const calculateDelay = (index) => {
  return index * 50
}
const searchQuery = ref('')
const filter = ref('')
const setfilter = value => {
  filter.value = value
}
const filtereditems = computed(() => {
  // let result = [...posts.value]
  let result = JSON.parse(JSON.stringify(posts.value))
  if (filter.value.length > 0) {
    result = result.filter(post => {
      const lowercaseQuery = filter.value.trim().toLowerCase()
      return (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery)
      )
    })
  }

  if (toggle.value === 0) {
    result = result.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else {
    result = result.sort((a, b) => b.comments.length - a.comments.length)
  }
  return result
})
const pageSize = ref(5)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filtereditems.value.length / pageSize.value))
const filteredSlicedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return filtereditems.value.slice(startIndex, endIndex)
})

</script>
<style lang="sass" scoped>
.v-field__append-inner
  cursor: pointer
h1
  font-size:3rem
</style>
