import tasks from '~/server/config/tasks.json'

export default defineEventHandler(async () => {
  if (!tasks) {
    return []
  }

  return { data: tasks.tasks, tags: tasks.allTags }
})
