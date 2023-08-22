<template>
  <v-layout class="h-100">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="isMobile ? rail = true : rail = false"
      :clipped="isMobile">
      <v-list-item :prepend-avatar="user.image === undefined ? avatar : user.image" nav title="Welcome">
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account" title="Profile" value="profile"
          @click="selectedTab = 'profile'"></v-list-item>
        <v-list-item prepend-icon="mdi-history" title="My Activity" value="activity"
          @click="selectedTab = 'activity'"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-main class="h-100" @click.stop="rail = true"> -->
    <v-main class="h-100">
      <v-container>
        <v-row v-show="selectedTab === 'profile'" class="max-width-835">
          <v-col cols="12" sm="6">
            <h2 class="profile-title">Profile</h2>
            <h4 class="personal-info-title">Personal Information</h4>
            <v-label class="info-label">Account</v-label>
            <v-text-field :value="user.account" class="info-input" density="compact" variant="outlined"
              disabled></v-text-field>
            <v-label class="info-label">Email</v-label>
            <v-text-field :value="user.email" class="info-input" density="compact" variant="outlined"
              disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img :src="user.image === undefined ? avatar : user.image" width="176" height="176" class="image"
              cover></v-img>
            <v-btn variant="text" color="primary" @click="openDialog" class="ms-10">Upload</v-btn>
          </v-col>
          <v-form :disabled="isSubmitting" @submit.prevent="submit">
            <v-col cols="12">
              <h4 class="personal-info-title">Reset Password</h4>
            </v-col>
            <v-col cols="12">
              <v-text-field density="compact" type="password" v-model="currentPassword.value.value"
                :error-messages="currentPassword.errorMessage.value" label="Current password" variant="outlined"
                class="info-input" color="primary"></v-text-field>
              <v-text-field density="compact" type="password" v-model="newPassword.value.value"
                :error-messages="newPassword.errorMessage.value" label="New password" variant="outlined"
                class="info-input" color="primary"></v-text-field>
              <v-text-field density="compact" type="password" v-model="confirmPassword.value.value"
                :error-messages="confirmPassword.errorMessage.value" label="Confirm new password" variant="outlined"
                class="info-input" color="primary"></v-text-field>
              <v-btn color="primary" type="submit" rounded width="300" variant="tonal">Update</v-btn>
            </v-col>
          </v-form>
        </v-row>
        <v-row v-show="selectedTab === 'activity'" class="max-width-835">
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="elevated">
              <v-card-title>Liked Articles</v-card-title>
              <v-card-text>
                <span class="highlight-number">{{ user.profile[0]?.likedArticles?.length || 0 }}</span></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="elevated">
              <v-card-title>Current Lesson</v-card-title>
              <v-card-text>
                <template v-if="user.profile[0] && user.profile[0].currentLesson !== null">
                  <span class="highlight-number">{{ user.profile[0].currentLesson }}</span></template>
                <template v-else>
                  <p>Start your learning journey now! Choose a lesson to begin.</p>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-card class="text-center" variant="elevated">
              <v-card-title>Posted Posts</v-card-title>
              <v-card-text>
                <span class="highlight-number">{{ user.profile[0]?.postedPosts?.length || 0 }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
  <v-dialog persistent v-model="dialog" width="200">
    <v-form @submit.prevent="upload">
      <v-card>
        <v-card-title class="text-center">Upload Image</v-card-title>
        <v-card-text>
          <vue-file-agent v-model="files" v-model:raw-model-value="rawFiles" :max-files="1" max-size="1MB"
            accept="image/jpg,image/jpeg,image/png" :multiple="false"
            :error-text="{ type: 'Invalid file format', size: 'File is too large' }" deletable
            ref="fileAgent"></vue-file-agent></v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" type="submit" variant="elevated">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { apiAuth } from '@/plugins/axios'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useSnackbar } from 'vuetify-use-dialog'
const user = useUserStore()

const { avatar } = storeToRefs(user)

const drawer = ref(true)
const createSnackbar = useSnackbar()
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
const rail = ref(isMobile.value)
const selectedTab = ref('profile')
const schema = yup.object({
  currentPassword: yup
    .string()
    .required('Password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(4, 'Password should have at least 4 characters')
    .max(20, 'Password should not exceed 20 characters'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .min(4, 'Password should have at least 4 characters')
    .max(20, 'Password should not exceed 20 characters')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

const currentPassword = useField('currentPassword')
const newPassword = useField('newPassword')
const confirmPassword = useField('confirmPassword')

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch('/users/reset', {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    })
    createSnackbar({
      text: 'Password updated successfully',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    resetForm()
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
const dialog = ref(false)

const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}
const files = ref([])
const rawFiles = ref([])
const fileAgent = ref(null)
const upload = async () => {
  if (files.value.length === 0) return
  try {
    const formData = new FormData()
    if (files.value.length > 0) formData.append('image', files.value[0].file)

    const { data } = await apiAuth.patch('/users/image', formData)
    user.image = data.result.image
    createSnackbar({
      text: 'Updated Successfully',
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
}
</script>

<style scope lang="sass" src="../../assets/pages/_profile.sass">
</style>
