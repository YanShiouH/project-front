<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Courses</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-btn color="green" @click="openDialog">Add Course</v-btn>
        <v-data-table-server v-model:items-per-page="tableItemsPerPage" v-model:sort-by="tableSortBy"
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
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog persistent v-model="dialog" width="500px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card class="dialog-card">
        <v-card-title>{{ dialogId.length > 0 ? 'Edit Course' : 'Add Course' }}</v-card-title>
        <v-card-text>
          <v-text-field label="Lesson No." v-model="lessonNo.value.value"
            :error-messages="lessonNo.errorMessage.value"></v-text-field>
          <v-text-field label="Topic" v-model="topic.value.value"
            :error-messages="topic.errorMessage.value"></v-text-field>
          <v-textarea label="Description" v-model="description.value.value"
            :error-messages="description.errorMessage.value"></v-textarea>
          <v-text-field v-for="(field, idx) in fields" :key="field.key" v-model="field.value"
            :error-messages="errors[`content[${idx}]`]" @click:append="idx === 0 ? push('') : remove(idx)"
            :append-icon="idx === 0 ? 'mdi-plus' : 'mdi-delete'"></v-text-field>
          <v-checkbox label="Publish" v-model="publish.value.value"
            :error-messages="publish.errorMessage.value"></v-checkbox>
          <!-- <vue-file-agent v-model="files" v-model:raw-model-value="rawFiles" :max-files="1" max-size="1MB"
            accept="image/jpg,image/jpeg,image/png" :multiple="false"
            :error-text="{ type: 'Invalid file format', size: 'File is too large' }" deletable
            ref="fileAgent"></vue-file-agent> -->
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
import { useForm, useField, useFieldArray } from 'vee-validate'
import * as yup from 'yup'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

// 目前表格設定一頁幾筆
const tableItemsPerPage = ref(5)
// 目前表格設定排序
const tableSortBy = ref([
  {
    key: 'title',
    order: 'asc'
  }
])
// 目前表格頁碼
const tablePage = ref(1)
// 表格商品
const tableProducts = ref([])
// 表格欄位
const tableHeaders = [
  { title: 'Lesson No.', align: 'center', sortable: true, key: 'lessonNo' },
  { title: 'Topic', align: 'center', sortable: true, key: 'topic' },
  { title: 'Description', align: 'center', sortable: true, key: 'description' },
  { title: 'Content', align: 'center', sortable: true, key: 'content' },
  { title: 'Publish', align: 'center', sortable: true, key: 'publish' },
  { title: 'Edit', align: 'center', sortable: false, key: 'edit' }
]
// 表格載入狀態
const tableLoading = ref(false)
// 表格總資料數
const tableItemsLength = ref(0)
// 表格搜尋
const tableSearch = ref('')
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

// 表格載入資料
const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/courses/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'title',
        sortOrder: tableSortBy.value[0]?.order || 'asc',
        search: tableSearch.value
      }
    })
    tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
    tableItemsLength.value = data.result.count
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
  tableLoading.value = false
}
tableLoadItems()
// 表格編輯
const tableEditItem = (item) => {
  // 設定表單id
  dialogId.value = item._id
  // 表單填入預設值
  lessonNo.value.value = item.lessonNo
  topic.value.value = item.topic
  description.value.value = item.description
  replace(item.content)
  publish.value.value = item.publish
  // 打開表單
  dialog.value = true
}

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
  // fileAgent.value.deleteFileRecord()
}
// 表單
const schema = yup.object({
  lessonNo: yup.string().required('Lesson No. is required'),
  topic: yup.string().required('Topic is required'),
  description: yup.string().required('Description is required'),
  content: yup.array().of(yup.string().required('Content is required')),
  publish: yup.boolean()
})

const { handleSubmit, isSubmitting, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    lessonNo: '',
    topic: '',
    description: '',
    content: [''],
    publish: false
  },
  validateOnMount: false
})
const { remove, push, fields, replace } = useFieldArray('content')
const lessonNo = useField('lessonNo')
const description = useField('description')
const topic = useField('topic')
const publish = useField('publish')

const submit = handleSubmit(async (values) => {
  try {
    if (dialogId.value.length > 0) {
      await apiAuth.patch('/courses/' + dialogId.value, values)
      createSnackbar({
        text: 'Updated Successfully',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })
    } else {
      await apiAuth.post('/courses', values)
      createSnackbar({
        text: 'Added Successfully',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })
    }
    closeDialog()
    tableLoadItems()
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

<style>
.dialog-card {
  max-height: 80vh !important;
  overflow-y: auto !important;
}
</style>
