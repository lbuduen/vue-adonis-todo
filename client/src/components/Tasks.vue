<template>
  <Panel title="Tasks">
    <div v-for="task in tasks" :key="task.id" class="task mt-2">
      <EditableRecord
        :isEditMode="task.isEditMode"
        :title="task.description"
        @onInput="setTaskDescription({task, description: $event})"
        @onEdit="setEditMode(task)"
        @onSave="saveTask(task)"
        @onDelete="deleteTask(task)"
      ></EditableRecord>
    </div>
    <CreateRecord
      placeholder="I need to..."
      :value="newTaskName"
      @onInput="setNewTaskName"
      @create="createTask"
    ></CreateRecord>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CreateRecord from "@/components/CreateRecord.vue";
import EditableRecord from "@/components/EditableRecord.vue";

export default {
  components: {
    CreateRecord,
    EditableRecord
  },
  computed: {
    ...mapState("tasks", ["tasks", "newTaskName"])
  },
  methods: {
    ...mapActions("tasks", ["createTask", "saveTask", "deleteTask"]),
    ...mapMutations("tasks", [
      "setNewTaskName",
      "setTaskDescription",
      "setEditMode"
    ])
  }
};
</script>

<style>
</style>