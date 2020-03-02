import Vue from 'vue'
import Vuex from 'vuex'

import { langStore } from '@/store/lang/lang.store';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    lang: langStore
  },
})
