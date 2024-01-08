import {defineStore} from "pinia";

export const useTaskStore = defineStore("TaskStore", {
    state: () => ({
        tasks: [],
        loading: false,
        name: "Surinder Singh Todo App",
    }),
    getters: {
        favTasks() {
            return this.tasks.filter((task) => task.isFav);
        },
        countFavTasks() {
            return this.favTasks.length;
        },
        countTasks: (state) => {
            return state.tasks.length;
        },
    },
    actions: {
        async getData() {
            this.loading = true;
            const res = await fetch("http://localhost:3000/tasks");
            const data = await res.json();
            this.tasks = data;
            this.loading = false;
        },
        async addTask(task) {
            this.tasks.push(task);

            const res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (res.error) {
                console.error(res.error);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter((task) => task.id !== id);

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
            });
            if (res.error) {
                console.error(res.error);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find((task) => task.id === id);
            task.isFav = !task.isFav;
            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({isFav: task.isFav}),
            });

            if (res.error) {
                console.error(res.error);
            }
        },
    },
});
