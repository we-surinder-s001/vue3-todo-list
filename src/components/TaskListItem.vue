<script setup>
import { useTaskStore } from "@/stores/TaskStore";
import { FwbModal, FwbButton } from "flowbite-vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
const { task } = defineProps(["task"]);
const taskStore = useTaskStore();

const deleteFunc = () => {
  taskStore.deleteTask(task.id);
  toast.success("tasks deleted successfully!");
};

const markAsDoneFunc = () => {
  taskStore.toggleFav(task.id);
  if (task.isFav === true) {
    toast.success("Marked as done!");
  }
};

// Confirm Delete Modal Variables ::
const confirmDeleteModal = ref(false);
function closeModal() {
  confirmDeleteModal.value = false;
}
function showModal() {
  confirmDeleteModal.value = true;
}
</script>

<template>
  <div class="task">
    <h3 :class="{ 'stricked-text': task.isFav }">{{ task.title }}</h3>
    <div class="icon">
      <i class="material-icons" @click="showModal">delete</i>
      <i
        :class="{ active: task.isFav }"
        class="material-icons"
        @click="markAsDoneFunc"
      >
        check
      </i>
    </div>
  </div>

  <!-- confirm Delete Modal :: -->
  <fwb-modal
    v-show="confirmDeleteModal"
    @close="closeModal"
    size="xs"
    not-escapable
  >
    <template #body>
      <p
        class="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex item-center gap-2 text-yellow-400"
      >
        <i class="material-icons">warning</i> Are you sure you want to delete
        this task?
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <fwb-button pill size="sm" @click="deleteFunc" color="yellow" outline>
          Delete
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<style lang="scss" scoped></style>
