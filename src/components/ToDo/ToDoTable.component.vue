<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 table-container">
      <table class="table table-stripe table-hover table-sm">
        <thead class="thead">
          <tr>
            <th scope="col" class="thead--col">{{ tTask }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
          <tr>
            <td>B</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script lang="js">
import { capitalize } from 'lodash-es'

export default {
  name: 'ToDoTable',
  computed: {
    tTask() {
      return capitalize(this.$t('task'))
    }
  }
}
</script>

<style scoped lang="scss">
.thead {
  background-color: #d35400;
  .thead--col {
    color: white;
  }
}

.table-container {
  margin: 30px 0 20px 0;
}
</style>
