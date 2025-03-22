import { defineStore } from 'pinia'

export type User = {
  name: string
  userName: string
}

export type AuthResponse = {
  success: boolean
  user: User
  msg?: string
  errorField?: 'password' | 'username'
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>()

  async function fetch(login: string, password: string) {
    // const hashedPassword = await argon2.hash(password); //password = admin123
    const response = await $fetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: { login, password },
    })

    if (!response.success) {
      return { user: undefined, msg: response.msg, errorField: response.errorField }
    }

    userInfo.value = response.user
    return { data: response.user, msg: response.msg }
  }

  async function checkAuth() {
    const response = await $fetch<AuthResponse>('/api/auth', {
      credentials: 'include',
    })

    if (!response.user) {
      return false
    }

    userInfo.value = response.user
    return true
  }

  function logout() {
    const cookie = useCookie('auth_token')

    cookie.value = null
    location.reload()
  }

  return {
    fetch,
    checkAuth,
    logout,
  }
})
