<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        Poster:{{ posts.account }}<br>
        {{ new Date(posts.date).toLocaleString('en-US') }}
        <h1>{{ posts.title }}</h1>
        <pre>{{ posts.content }}</pre>
      </v-col>
      <v-col cols="12" v-if="isLogin">
        <v-btn color="green" @click="openDialog">Add New Comment</v-btn>
        <!-- <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field v-model.number="quantity.value.value" type="number" label="數量" min="0"
            :error-messages="quantity.errorMessage.value"></v-text-field>
          <v-btn type="submit" color="green">加入購物車</v-btn>
        </v-form> -->
      </v-col>
      <v-col cols="12" md="6" lg="3" v-for="comment in comments" :key="comment._id">
        <CommentCard v-bind="comment"></CommentCard>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog persistent v-model="dialog" width="500px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>Add New Comment</v-card-title>
        <v-card-text>
          <v-textarea label="Content" v-model="content.value.value"
            :error-messages="content.errorMessage.value"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeDialog" :loading="isSubmitting">Cancel</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
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
    closeDialog()
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
</script>
