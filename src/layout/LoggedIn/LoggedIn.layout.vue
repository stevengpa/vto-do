<template>
  <div>
    <logged-in-header
      :langs="langs"
      :lang="lang"
      @onChangeLanguage="changeLang"
    />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import LoggedInHeader from '@/components/LoggedIn/header/header.component.vue'
import { langActions } from '@/store/lang/lang.actionTypes'
import { loadLanguageAsync } from '@/i18n/i18n'

export default {
  name: 'LoggedInLayout',
  components: { LoggedInHeader },
  computed: {
    ...mapGetters({
      lang: 'lang',
      langs: 'langs',
    }),
  },
  methods: {
    ...mapActions({
      changeLanguage: langActions.CHANGE_LANGUAGE,
    }),
    changeLang(lang) {
      if (lang !== this.lang) {
        this.changeLanguage(lang).then(() =>
          this.$router.replace({ query: { lang } })
        )
      }
    },
  },
}
</script>

<style scoped></style>
