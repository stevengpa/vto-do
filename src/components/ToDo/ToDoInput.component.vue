<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          aria-label="Text input with segmented dropdown button"
          :placeholder="tAddATask"
        />
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script lang="js">
import { capitalize } from 'lodash-es'
export default {
  name: 'ToDoInput',
  computed: {
    tAddATask() {
      return capitalize(this.$t('addATask'))
    }
  }
}
</script>

<style scoped lang="scss"></style>
