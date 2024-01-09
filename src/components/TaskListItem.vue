<script setup>
import { useTaskStore } from "@/stores/TaskStore";
const { task } = defineProps(["task"]);
const taskStore = useTaskStore();

const deleteFunc = () => {
  const res = confirm("Are you sure you want");
  if (res) {
    taskStore.deleteTask(task.id);
  }
};
</script>
<template>
  <div class="task">
    <h3 :class="{ 'stricked-text': task.isFav }">{{ task.title }}</h3>
    <div class="icon">
      <i class="material-icons" @click="deleteFunc()">delete</i>
      <i
        :class="{ active: task.isFav }"
        class="material-icons"
        @click="taskStore.toggleFav(task.id)"
      >
        check
      </i>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
