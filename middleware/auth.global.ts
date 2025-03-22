export default defineNuxtRouteMiddleware(async (to, _) => {
  const authToken = useCookie('auth_token')
  const user = useUserStore()

  if (authToken.value == undefined && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (authToken.value) {
    const isAuthorized = user.checkAuth()

    if (!isAuthorized) {
      authToken.value = null
      return navigateTo('/login')
    }
  }
})
