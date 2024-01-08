<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
import { storeToRefs } from "pinia";

// const { addTask, tasks, countTasks } = storeToRefs(useTaskStore());
const taskStore = useTaskStore();
const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      id: Math.random() * newTask.value.length,
      title: newTask.value,
      isFav: false,
    });
    newTask.value = "";
  }
};
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to do.." v-model="newTask" />
    <button>+ Add</button>
  </form>
</template>

<style lang="scss" scoped></style>
