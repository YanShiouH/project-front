<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Sign-up</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field v-model="account.value.value" :error-messages="account.errorMessage.value" label="帳號" counter
            max-length="20"></v-text-field>
          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="信箱"
            type="email"></v-text-field>
          <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.valye" label="密碼" counter
            max-length="20" type="password"></v-text-field>
          <v-text-field v-model="passwordConfirm.value.value" :error-messages="passwordConfirm.errorMessage.value"
            label="確認密碼" counter max-length="20" type="password"></v-text-field>
          <div class="text-center">
            <v-btn type="submit" color="green" text-center>Sign Up</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const createSnackbar = useSnackbar()
const router = useRouter()

const schema = yup.object({
  account: yup
    .string()
    .required('帳號必填')
    .min(4, '帳號最少4個字')
    .max(20, '帳號最多20個字'),
  email: yup
    .string()
    .required('信箱必填')
    .test(
      'isEmail', '信箱格式錯誤', (value) => validator.isEmail(value)
    ),
  password: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少4個字')
    .max(20, '密碼最多20個字'),
  passwordConfirm: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少4個字')
    .max(20, '密碼最多20個字')
    .oneOf([yup.ref('password')], '密碼不一致')
})

const { handleSubmit, isSubmitting, handleReset } = useForm({
  validationSchema: schema
})
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/users', {
      account: values.account,
      email: values.email,
      password: values.password
    })
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/login')
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
