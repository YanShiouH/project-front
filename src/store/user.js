import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { apiAuth } from '@/plugins/axios'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const role = ref(UserRole.USER)
  // const profile = ref([])

  const login = (data) => {
    token.value = data.token
    account.value = data.account
    email.value = data.email
    role.value = data.role
    // profile.value = data.profile
  }
  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })
  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/120/${account.value}?colors=2F2BAD,AD2BAD,E42692,F71568,F7DB15`
  })
  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      role.value = data.result.role
      // profile.value = data.result.profile
    } catch (error) {
      token.value = ''
    }
  }
  const logout = () => {
    token.value = ''
    account.value = ''
    email.value = ''
    role.value = UserRole.USER
    // profile.value = []
  }
  return {
    token, account, email, role, login, isLogin, isAdmin, avatar, getProfile, logout
  }
}, {
  persist: {
    key: '20230725',
    paths: ['token']
  }
})
