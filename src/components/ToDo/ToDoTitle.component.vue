<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 text-center title-container">
      <h1>{{ title }}</h1>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
export default {
  name: 'ToDoTitle',
  data() {
    return {
      title: 'To Do List',
    }
  },
}
</script>

<style scoped lang="scss">
.title-container {
  margin: 20px 0 20px 0;
}
</style>
