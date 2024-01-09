<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    const res = tasks.value.find(({ title }) => {
      return newTask.value === title;
    });

    if (!res) {
      taskStore.addTask({
        id: Math.random() * newTask.value.length,
        title: newTask.value,
        isFav: false,
      });
      newTask.value = "";
      toast.success("To do added");
    } else {
      toast.warn("To do already added.");
    }
  }
};
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to do.." v-model="newTask" />
    <button>+ Add</button>
  </form>
</template>

<style scoped></style>
