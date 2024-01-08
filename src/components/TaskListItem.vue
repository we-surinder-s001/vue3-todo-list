<script setup>
import { useTaskStore } from "@/stores/TaskStore";
const { task } = defineProps(["task"]);

const taskStore = useTaskStore();
</script>
<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icon">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        :class="{ active: task.isFav }"
        class="material-icons"
        @click="taskStore.toggleFav(task.id)"
      >
        favorite
      </i>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
