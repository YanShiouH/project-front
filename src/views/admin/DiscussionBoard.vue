<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Discussion Board</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table-server v-model:items-per-page="tableItemsPerPage" v-model:sort-by="tableSortBy"
          v-model:page="tablePage" :items="tableProducts" :headers="tableHeaders" :loading="tableLoading"
          :items-length="tableItemsLength" :search="tableSearch" hover @update:items-per-page="tableLoadItems"
          @update:sort-by="tableLoadItems" @update:page="tableLoadItems">
          <template #top>
            <v-text-field label="Search" append-icon="mdi-magnify" @click:append="tableApplySearch"
              @keydown.enter="tableApplySearch" v-model="tableSearch"></v-text-field>
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
      <v-card>
        <v-card-title>Article Review</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title.value.value" :error-messages="title.errorMessage.value"
            readonly></v-text-field>
          <v-textarea label="Content" v-model="content.value.value" :error-messages="content.errorMessage.value"
            readonly></v-textarea>
          <v-select label="Status" v-model="category.value.value" :error-messages="category.errorMessage.value"
            :items="categories"></v-select>
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
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

// 目前表格設定一頁幾筆
const tableItemsPerPage = ref(5)
// 目前表格設定排序
const tableSortBy = ref([
  {
    key: 'name',
    order: 'asc'
  }
])
// 目前表格頁碼
const tablePage = ref(1)
// 表格商品
const tableProducts = ref([])
// 表格欄位
const tableHeaders = [
  { title: 'User', align: 'center', sortable: true, key: 'user' },
  { title: 'Title', align: 'center', sortable: true, key: 'title' },
  { title: 'Content', align: 'center', sortable: true, key: 'content' },
  { title: 'Date', align: 'center', sortable: true, key: 'date' },
  { title: 'Comments', align: 'center', sortable: true, key: 'comments.length' },
  { title: 'Status', align: 'center', sortable: true, key: 'status' },
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
    const { data } = await apiAuth.get('/admin/discussion/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || '_id',
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
  // 設定表單 id
  dialogId.value = item._id
  // 表單填入預設值
  title.value.value = item.title
  content.value.value = item.content
  category.value.value = item.status

  // 打開表單
  dialog.value = true
}

// 表單對話框
const dialog = ref(false)
const dialogId = ref('')

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

// 表單
const categories = ['Pending Approval', 'Approved', 'Rejected']
const schema = yup.object({
  category: yup
    .string()
    .required('Status is required')
    .test('isCategory', (value) => categories.includes(value))
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    content: '',
    category: ''
  }
})
const title = useField('title')
const content = useField('content')
const category = useField('category')

const submit = handleSubmit(async (values) => {
  try {
    const formData = new FormData()
    formData.append('status', values.category)

    await apiAuth.patch('/admin/discussion/' + dialogId.value, formData)

    createSnackbar({
      text: 'Review Completed',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
    tableLoadItems()
  } catch (error) {
    console.log(error)
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
