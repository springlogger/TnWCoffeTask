<script setup lang="ts">
const user = useUserStore()
</script>

<template>
  <div>
    <h1>Welcome to the Profile page</h1>
    <button @click="user.logout">Выйти</button>
  </div>
</template>
