<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Discussion Board</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" v-if="isLogin">
        <v-btn color="green" @click="openDialog">Add New Post</v-btn>
        <!-- <v-data-table-server v-model:items-per-page="tableItemsPerPage" v-model:sort-by="tableSortBy"
          v-model:page="tablePage" :items="tableProducts" :headers="tableHeaders" :loading="tableLoading"
          :items-length="tableItemsLength" :search="tableSearch" hover @update:items-per-page="tableLoadItems"
          @update:sort-by="tableLoadItems" @update:page="tableLoadItems">
          <template #top>
            <v-text-field label="Search" append-icon="mdi-magnify" @click:append="tableApplySearch"
              @keydown.enter="tableApplySearch" v-model="tableSearch"></v-text-field>
          </template>
          <template #[`item.image`]="{ item }">
            <v-img :src="item.raw.image" height="50px"></v-img>
          </template>
          <template #[`item.publish`]="{ item }">
            <v-icon icon="mdi-check" v-if="item.raw.publish"></v-icon>
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" @click="tableEditItem(item.raw)" variant="text"></v-btn>
          </template>
        </v-data-table-server> -->
      </v-col>
      <v-col cols="12" v-for="post in posts" :key="post._id">
        <PostCard v-bind="post"></PostCard>
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
          <v-btn color="red" @click="closeDialog" :loading="isSubmitting">Cancel</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { apiAuth, api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import PostCard from '@/components/PostCard.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const user = useUserStore()

const { isLogin } = storeToRefs(user)

const createSnackbar = useSnackbar()
const posts = ref([]);

(async () => {
  try {
    const { data } = await api.get('/discussion')
    posts.value.push(...data.result)
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
</script>
