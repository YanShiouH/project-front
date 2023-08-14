<template>
  <v-container>
    <v-row class="max-width-512">
      <v-col cols="12">
        <h1>Sign-up</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field v-model="account.value.value" :error-messages="account.errorMessage.value" label="Account" counter
            max-length="20"></v-text-field>
          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Email"
            type="email"></v-text-field>
          <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="Password"
            counter max-length="20" type="password"></v-text-field>
          <v-text-field v-model="passwordConfirm.value.value" :error-messages="passwordConfirm.errorMessage.value"
            label="Confirm Password" counter max-length="20" type="password"></v-text-field>
          <div class="text-center">
            <v-btn type="submit" color="primary" text-center>Sign Up</v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" class="text-center">
        Already have a Taealam Account?<router-link to="/login">Log In</router-link>
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
    .required('Account is required')
    .min(4, 'Account should have at least 4 characters')
    .max(20, 'Account should not exceed 20 characters'),
  email: yup
    .string()
    .required('Email is required')
    .test(
      'isEmail', 'Invalid email format', (value) => validator.isEmail(value)
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password should have at least 4 characters')
    .max(20, 'Password should not exceed 20 characters'),
  passwordConfirm: yup
    .string()
    .required('Password is required')
    .min(4, 'Password should have at least 4 characters')
    .max(20, 'Password should not exceed 20 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match')
})

const { handleSubmit, isSubmitting } = useForm({
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
      text: 'Registration successful',
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
<style lang="sass" scoped src="../../assets/pages/_register.sass">
</style>
