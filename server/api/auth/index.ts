import users from '~/server/config/users.json'

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token')

  if (!authToken) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  const user = users.find((u) => u.credentials.username.toString() === authToken)

  if (!user) {
    throw createError({ statusCode: 401, message: 'Пользователь не найден' })
  }

  return { success: true, user }
})
