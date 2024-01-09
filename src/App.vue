<script setup>
import { ref, watchEffect } from "vue";
import TaskListItemVue from "./components/TaskListItem.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { tasks, name, favTasks, countTasks, countFavTasks, loading } =
  storeToRefs(taskStore);
const filter = ref("favs");
const isActiveFav = ref(true);
const isActiveAll = ref(false);

const toggleNav = (selectedNav) => {
  filter.value = selectedNav;
  if (selectedNav === "favs") {
    isActiveFav.value = true;
    isActiveAll.value = false;
  } else {
    isActiveFav.value = false;
    isActiveAll.value = true;
  }
};

watchEffect(() => {
  taskStore.getData();
});
watchEffect(() => {
  tasks.value.sort((a, b) => (a.isFav === b.isFav ? 0 : a.isFav ? -1 : 1));
});
</script>

<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/vuejs-icon.svg" alt="pinia-logo" />
      <h1>{{ name }}</h1>
    </header>

    <!-- Add task form  -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- Filter -->
    <nav class="filter">
      <button @click="toggleNav('favs')" :class="{ isActiveFav }">
        Incompleted
      </button>
      <button @click="toggleNav('all')" :class="{ isActiveAll }">
        All To Do
      </button>
      <!-- <button @click="taskStore.$reset">Reset</button> -->
    </nav>

    <!-- Loading...  -->
    <div class="loading" v-show="loading">Loading...</div>

    <!-- Task List -->
    <!-- All Tasks -->
    <div class="task-list" v-show="filter === 'all'">
      <p>You have {{ countTasks }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskListItemVue :task="task" />
      </div>
    </div>
    <!-- Favorite Tasks -->
    <div class="task-list" v-show="filter === 'favs'">
      <p>You have {{ countFavTasks }} tasks left to do</p>
      <div v-for="task in favTasks" :key="task.id">
        <TaskListItemVue :task="task" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.isActiveAll {
  background: #41b88398;
}
.isActiveFav {
  background: #41b88398;
}
</style>
