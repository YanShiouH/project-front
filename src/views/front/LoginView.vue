<template>
  <v-container>
    <v-row class="max-width-512">
      <v-col cols="12">
        <h1 class="text-center">Login</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field v-model="account.value.value" :error-messages="account.errorMessage.value" label="Account" counter
            maxlength="20"></v-text-field>
          <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="Password"
            counter maxlength="20" type="password"></v-text-field>
          <div class="text-center">
            <v-btn type="submit" color="primary" :loading="isSubmitting">Log In</v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" class="text-center">
        Need a Taealam account? <router-link to="/register" class="register-link"> Sign Up</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    .string()
    .required('Account is required')
    .min(4, 'Account should have at least 4 characters')
    .max(20, 'Account should not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password should have at least 4 characters')
    .max(20, 'Password should not exceed 20 characters')
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
const account = useField('account')
const password = useField('password')
const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    user.login({
      token: data.result.token,
      account: data.result.account,
      email: data.result.email,
      profile: data.result.profile,
      role: data.result.role,
      image: data.result.image
    })
    // createSnackbar({
    //   text: 'Login successful',
    //   showCloseButton: false,
    //   snackbarProps: {
    //     timeout: 2000,
    //     color: 'green',
    //     location: 'bottom'
    //   }
    // })
    router.push('/')
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

<style lang="sass" scoped src="../../assets/pages/_login.sass">
</style>
