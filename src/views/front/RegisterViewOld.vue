<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>註冊</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form v-model="valid" @submit.prevent="register">
          <v-text-field v-model="form.account" label="帳號" counter max-length="20"
            :rules="[rules.required, rules.min, rules.max]"></v-text-field>
          <v-text-field v-model="form.email" label="信箱" type="email"
            :rules="[rules.required, rules.email]"></v-text-field>
          <v-text-field v-model="form.password" label="密碼" counter max-length="20" type="password"
            :rules="[rules.required, rules.min, rules.max, rules.confirm]" ref="elPassword"
            @update:modelValue="elPasswordConfirm.validate()"></v-text-field>
          <v-text-field v-model="form.confirmPassword" label="確認密碼" counter max-length="20" type="password"
            :rules="[rules.required, rules.min, rules.max, rules.confirm]" @update:modelValue="elPassword.validate()"
            ref="elPasswordConfirm"></v-text-field>
          <div class="text-center">
            <v-btn type="submit" color="green" text-center>註冊</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'

const valid = ref(false)
const form = reactive({
  account: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const elPassword = ref(null)
const elPasswordConfirm = ref(null)

const rules = {
  required: (value) => !!value || '欄位必填',
  email: (value) => validator.isEmail(value) || '格式錯誤',
  min: (value) => value.length >= 4 || '長度必須大於4個字',
  max: (value) => value.length <= 20 || '長度必須小於20個字',
  confirm: (value) => form.confirmPassword === form.password || '密碼不一致'
}

</script>
