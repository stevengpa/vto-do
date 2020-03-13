<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/todo">TODO LIST</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav">
        <router-link
          class="nav-item nav-link"
          tag="li"
          active-class="active"
          exact-active-class="active"
          to="/todo"
          >To Do</router-link
        >
        <router-link
          class="nav-item nav-link"
          tag="li"
          active-class="active"
          to="/report"
          >{{ report }}</router-link
        >
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ lang }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              class="dropdown-item"
              to=""
              :event="''"
              @click.native.prevent="changeLanguageHandler"
              >{{ lang }}</router-link
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="js">
import { capitalize } from 'lodash-es'

export default {
  props: {
    lang: String,
    langs: Array
  },
  data() {
    return {
      name: 'LoggedInHeader',
    };
  },
  methods: {
    changeLanguageHandler(event) {
      event.preventDefault()
      const lang = event.target.text
      this.$emit('onChangeLanguage', lang)
    }
  },
  computed: {
    report() {
      return capitalize(this.$t('report'))
    }
  },
}
</script>

<style scoped lang="scss">
.navbar-brand {
  color: #bdc3c7;
}

.navbar-collapse {
  flex-direction: row-reverse;

  .nav-item {
    cursor: pointer;
  }

  .nav-link.active {
    color: #d35400;
  }
}
</style>
