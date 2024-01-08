<script setup>
import {ref, watchEffect} from "vue";
import TaskListItemVue from "./components/TaskListItem.vue";
import TaskForm from "./components/TaskForm.vue";
import {useTaskStore} from "./stores/TaskStore";
import {storeToRefs} from "pinia";

const taskStore = useTaskStore();
const {tasks, name, favTasks, countTasks, countFavTasks, loading} =
    storeToRefs(taskStore);
const filter = ref("all");

watchEffect(() => {
  taskStore.getData();
});
</script>

<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/vuejs-icon.svg" alt="pinia-logo"/>
      <!-- <h1>Pinia Tasks</h1> -->
      <h1>{{ name }}</h1>
    </header>

    <!-- Add task form  -->
    <div class="new-task-form">
      <TaskForm/>
    </div>
    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Fav Task</button>
      <button @click="taskStore.$reset">Reset</button>
    </nav>

    <!-- Loading...  -->
    <div class="loading" v-show="loading">Loading...</div>

    <!-- Task List -->
    <!-- All Tasks -->
    <div class="task-list" v-show="filter === 'all'">
      <p>You have {{ countTasks }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskListItemVue :task="task"/>
      </div>
    </div>
    <!-- Favorite Tasks -->
    <div class="task-list" v-show="filter === 'favs'">
      <p>You have {{ countFavTasks }} tasks left to do</p>
      <div v-for="task in favTasks" :key="task.id">
        <TaskListItemVue :task="task"/>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
