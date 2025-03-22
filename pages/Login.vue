<script setup lang="ts">
const router = useRouter()
const user = useUserStore()

const login = ref('')
const password = ref('')
const isFetching = ref(false)

const errMsg = ref<
  | Partial<{
      msg: string
      errorField: 'password' | 'username'
    }>
  | undefined
>()

async function auth() {
  isFetching.value = true

  try {
    const { data, msg, errorField } = await user.fetch(login.value, password.value)

    if (!data) {
      errMsg.value = {
        msg: msg,
        errorField: errorField,
      }
      return
    } else {
      errMsg.value = undefined
    }
  } catch (e) {
    console.log(e)
    return
  } finally {
    isFetching.value = false
  }

  router.push('/')
}
</script>

<template>
  <div class="login__wrapper">
    <div v-if="isFetching">
      <AppSpinner class="spinner" />
    </div>

    <form class="login__form" @submit.prevent="auth">
      <h1>Welcome to the Login page</h1>

      <div class="login__inputs">
        <input
          v-model="login"
          :class="{ error__field: errMsg?.errorField === 'username' }"
          placeholder="Username..."
        />
        <input
          v-model="password"
          :class="{ error__field: errMsg?.errorField === 'password' }"
          placeholder="Password..."
          type="password"
        />
        <button type="submit">Войти</button>
      </div>
      <div v-if="errMsg" class="login__error">
        <p>{{ errMsg.msg }}</p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login__wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  position: relative;

  .spinner {
    position: absolute;
    margin-left: -5rem;
    margin-top: -10rem;
  }

  .login__form {
    width: 30%;
    height: 30%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;

    h1 {
      color: transparent;
      background-image: linear-gradient(to right, $orange, $red);
      background-clip: text;
      text-align: center;
    }

    .login__inputs {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 1rem;

      input {
        width: 100%;
        background-color: $black;
        color: white;
        padding: 1rem;
        border-radius: 1rem;
        font-size: small;
        border: none;

        &:focus {
          outline: 2px solid $red;
        }
      }

      .error__field {
        border: 2px solid red !important;
      }

      button {
        margin-top: 1rem;
        width: 30%;
        align-self: end;
        padding: 0.5rem;
        border-radius: 1rem;
        font-size: large;
        background-color: $red;
        color: black;
        border: none;
        cursor: pointer;
        transition: background-color 0.05s linear;

        &:hover {
          background-color: rgba($red, 0.7);
        }
      }
    }

    .login__error {
      color: red;
    }
  }
}
</style>
