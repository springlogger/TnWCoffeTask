import { defineStore } from 'pinia'

export type Task = {
  id: number
  name: string
  description: string
  status: number
  date_created: Date
  priority: string
  tags: string[]
}

export type GetTasksResponse = {
  data: Task[]
  tags: string[]
}

export const useTasksStore = defineStore('tasks', () => {
  const tasksList = ref<Task[]>()
  const allTags = ref<string[]>([])

  async function fetch() {
    const response = await $fetch<GetTasksResponse>('/api/tasks', {
      method: 'GET',
    })

    if (!response) {
      console.log('Ошибка при получении списка задач')
      return
    }
    tasksList.value = response.data

    if (!response.tags) {
      console.log('Ошибка при получении списка тэгов')
    }
    allTags.value = response.tags
  }

  return {
    tasksList,
    allTags,
    fetch,
  }
})
