<template>
  <div>
    <to-do-title />
    <to-do-input />
    <to-do-table />
  </div>
</template>

<script lang="js">
import ToDoInput from "../../components/ToDo/ToDoInput.component.vue";
import ToDoTitle from "../../components/ToDo/ToDoTitle.component";
import ToDoTable from "../../components/ToDo/ToDoTable.component";

export default {
  components: {
    ToDoInput,
    ToDoTitle,
    ToDoTable
  },

  data() {
    return {
      name: 'To Do List'
    };
  },

  methods: {
    onClick() {
      this.name = 'Demo';
    }
  },
};
</script>

<style scoped></style>
