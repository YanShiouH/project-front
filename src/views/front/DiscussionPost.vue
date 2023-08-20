<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12">
        Poster: {{ posts.account }}<br>
        {{ new Date(posts.date).toLocaleString('en-US') }}
        <h1>{{ posts.title }}</h1>
        {{ posts.content }}
      </v-col>
      <v-col cols="12" v-if="isLogin">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-textarea label="Add a Comment" v-model="content.value.value" :error-messages="content.errorMessage.value"
            variant="outlined" clearable rows="2"></v-textarea>
          <div class="d-flex justify-end">
            <v-btn color="primary" type="submit" :loading="isSubmitting">Submit</v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" v-if="!isLogin" class="text-center">
        <p class="login-message">Please <router-link to="/login" class="login-link">log in</router-link> to leave a
          comment.</p>
      </v-col>
      <v-col cols="12" v-for="(comment, index) in comments" :key="comment._id" data-aos="fade-down"
        data-aos-duration="1200" :data-aos-delay="calculateDelay(index)" data-aos-offset="-100">
        <CommentCard v-bind="comment"></CommentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { api, apiAuth } from '@/plugins/axios'
import { useRoute } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import CommentCard from '@/components/CommentCard.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const { isLogin } = storeToRefs(user)

const route = useRoute()
const createSnackbar = useSnackbar()

const posts = ref({
  _id: '',
  title: '',
  content: '',
  account: '',
  date: '',
  status: ''
})
const comments = ref([]);
(async () => {
  try {
    const { data } = await api.get('/discussion/' + route.params.id)
    posts.value._id = data.result._id
    posts.value.title = data.result.title
    posts.value.content = data.result.content
    posts.value.account = data.result.account
    posts.value.status = data.result.status
    posts.value.date = data.result.date
    document.title = 'Taealam | ' + posts.value.title
    comments.value.push(...data.commentResult)
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

// 表單
const schema = yup.object({
  content: yup.string().required('Content is required')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    content: ''
  }
})

const content = useField('content')

const submit = handleSubmit(async (values) => {
  try {
    const formData = new FormData()
    formData.append('content', values.content)
    formData.append('date', new Date().toISOString())
    await apiAuth.post('/discussion/' + route.params.id, formData)
    createSnackbar({
      text: 'Submitted successfully',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    resetForm()
    const { data } = await api.get('/discussion/' + route.params.id)
    comments.value = [...data.commentResult]
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
</script>

<style lang="sass" scoped src="../../assets/pages/_discussionPost.sass">
</style>
