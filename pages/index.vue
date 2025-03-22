<script setup lang="ts">
const user = useUserStore()
const tasks = useTasksStore()

const selectedStatus = ref<number | null>(null)
const selectedPriority = ref<string | null>(null)
const selectedTags = ref<string[]>([])

const filteredTasks = computed(() => {
  return tasks.tasksList?.filter((task) => {
    const statusMatch = selectedStatus.value === null || task.status === selectedStatus.value

    const priorityMatch =
      selectedPriority.value === null || task.priority === selectedPriority.value

    const tagsMatch =
      selectedTags.value.length === 0 || selectedTags.value.every((tag) => task.tags.includes(tag))

    return statusMatch && priorityMatch && tagsMatch
  })
})

await tasks.fetch()

function getPriorityColor(priority: string) {
  return {
    color: priority === 'low' ? 'green' : priority === 'medium' ? 'orange' : 'red',
  }
}
</script>

<template>
  <div class="main__wrapper">
    <div class="task-table__wrapper">
      <h1>Tasks table</h1>
      <div class="task-table__filters">
        <label>
          Статус:
          <select v-model="selectedStatus">
            <option :value="null">Все</option>
            <option :value="0">Не выполнено</option>
            <option :value="1">Выполнено</option>
          </select>
        </label>

        <label>
          Приоритет:
          <select v-model="selectedPriority">
            <option :value="null">Все</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>

        <label>
          Теги:
          <select v-model="selectedTags" multiple>
            <option v-for="tag in tasks.allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </label>
      </div>
      <table v-if="tasks.tasksList?.length" class="task-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Описание</th>
            <th>Приоритет</th>
            <th>Тэги</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td>
              <i v-if="task.status === 0" class="fa-solid fa-x error-icon"></i>
              <i v-else class="fa-solid fa-check success-icon"></i>
            </td>
            <td>{{ task.description }}</td>
            <td :style="getPriorityColor(task.priority)">{{ task.priority }}</td>
            <td>{{ task.tags.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="user.logout">Выйти</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main__wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .task-table__wrapper {
    width: 40%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;

    h1 {
      text-align: center;
      color: $orange;
    }

    .task-table__filters {
      align-self: flex-end;
      text-align: center;
      margin-bottom: 1rem;
    }

    .task-table {
      width: 100%;
      border-collapse: collapse;
      transition: all 0.1s linear;
      background-color: #1b1b1b;

      .error-icon {
        color: red;
      }

      .success-icon {
        color: green;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        padding: 1rem;
      }

      th {
        background-color: #333;
        color: white;
      }

      tr {
        transition: all 0.05s linear;

        &:hover {
          background-color: #cfcfcf;
          color: #000;
        }
      }
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem;
      font-size: large;
      align-self: flex-end;
      width: 9rem;
      height: 3rem;
      border-radius: 1rem;
      border: none;
      background-color: $orange;
      cursor: pointer;
      transition: all 0.1s linear;

      &:hover {
        background-color: rgba($red, $alpha: 0.8);
      }
    }
  }
}
</style>
