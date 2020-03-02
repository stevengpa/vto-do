import { vueI18n, isLanguageAllowed, loadLanguageAsync } from '@/i18n/i18n';
import { langTypes, langActions } from '@/store/lang/lang.actionTypes';

const DEFAULT_LANG = process.env.VUE_APP_DEFAULT_LANG;
const DEFAULT_LANGS = process.env.VUE_APP_DEFAULT_LANGS.split(',');

// @ts-ignore
export const langStore = {
  state: {
    lang: localStorage.getItem('lang') || DEFAULT_LANG,
    langs: DEFAULT_LANGS,
    error: null,
  },
  getters: {
    lang(state: any) {
      return state.lang;
    },
    langs(state: any) {
      return state.langs
    }
  },
  mutations: {
    [langTypes.SET_LANGUAGE_STATE](state: any, lang: any) {
      state.lang = lang;
      state.error = null
    },
    [langTypes.SET_LANGUAGE_LOCAL_STORAGE](state: any, lang: any) {
      localStorage.setItem('lang', lang);
      state.error = null
    },
    [langTypes.SET_LANGUAGE_VI18N](state: any, lang: any) {
      vueI18n.locale = lang
      state.error = null
    },
    [langTypes.SET_LANGUAGE_INIT](state: any) {
      state.error = null
    },
    [langTypes.SET_LANGUAGE_COMPLETED](state: any) {},
    [langTypes.SET_LANGUAGE_FILE](state: any) {},
    [langTypes.SET_LANGUAGE_FAIL](state: any, error: any) {
      state.error = error
    }
  },
  actions: {
    [langActions.CHANGE_LANGUAGE_STATE]({ commit }: any, lang: any) {
      const _lang = isLanguageAllowed(lang) ? lang : DEFAULT_LANG
      commit(langTypes.SET_LANGUAGE_STATE, _lang);
    },
    [langActions.CHANGE_LANGUAGE_LOCAL_STORAGE]({ commit }: any, lang: any) {
      const _lang = isLanguageAllowed(lang) ? lang : DEFAULT_LANG
      commit(langTypes.SET_LANGUAGE_LOCAL_STORAGE, _lang);
    },
    [langActions.CHANGE_LANGUAGE_VI18N]({ commit }: any, lang: any) {
      const _lang = isLanguageAllowed(lang) ? lang : DEFAULT_LANG;
      commit(langTypes.SET_LANGUAGE_VI18N, _lang);
    },
    [langActions.CHANGE_LANGUAGE_FILE]({ commit }: any, lang: any) {
      const _lang = isLanguageAllowed(lang) ? lang : DEFAULT_LANG;
      return loadLanguageAsync(_lang).then(() => commit(langTypes.SET_LANGUAGE_FILE))
    },
    [langActions.CHANGE_LANGUAGE]({ dispatch, commit }: any, lang: any) {
      const _lang = isLanguageAllowed(lang) ? lang : DEFAULT_LANG;
      
      commit(langTypes.SET_LANGUAGE_INIT)
      
      return dispatch(langActions.CHANGE_LANGUAGE_LOCAL_STORAGE, _lang)
        .then(() => dispatch(langActions.CHANGE_LANGUAGE_STATE, _lang))
        .then(() => dispatch(langActions.CHANGE_LANGUAGE_FILE, _lang))
        .then(() => commit(langTypes.SET_LANGUAGE_COMPLETED))
        .catch((err: any) => dispatch(langActions.CHANGE_LANGUAGE_FAIL, err))
    },
    [langActions.CHANGE_LANGUAGE_FAIL]({ commit }: any, error: any) {
      commit(langTypes.SET_LANGUAGE_FAIL, error);
    },
  }
};
