import users from '~/server/config/users.json'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = users.find((u) => u.credentials.username === body.login)

  if (!user) {
    return {
      success: false,
      user,
      msg: 'Не верно введён логин или паароль',
      errorField: 'username',
    }
  }

  const isPasswordValid = body.password === user.credentials.passphrase

  if (!isPasswordValid) {
    return { success: false, user, msg: 'Не верный пароль', errorField: 'password' }
  }

  setCookie(event, 'auth_token', user.credentials.username, { path: '/' })
  return { success: true, user }
})
