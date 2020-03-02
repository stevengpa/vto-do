import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import { get } from 'lodash-es'

import store from '@/store/index'
import {routes} from '@/router/routes'
import {langActions} from '@/store/lang/lang.actionTypes';
import {loadLanguageAsync, isLanguageAllowed} from '@/i18n/i18n'

const DEFAULT_LANG = process.env.VUE_APP_DEFAULT_LANG

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => langQueryHandler(to, from, next))

function langQueryHandler(to: any, from: any, next: any) {
  const langLocalStorage = localStorage.getItem('lang')
  const queryLang = getQuery('lang', to.query, from.query)
  
  getValidLangAndSyncLangInApp(langLocalStorage, queryLang)
    .then((validLang) => loadLangFileAsync(validLang))
    .then((validLang) => syncRedirectIfNeeded(validLang, to, from, next))
    .catch((err) => console.error('ROUTING ERROR'));
}

function getQuery(name: string, toQuery: any, fromQuery: any) {
  let query = ''
  query = get(toQuery, name, null)
  query = query ? query : get(fromQuery, name, null)
  
  return query
}

function getValidLangAndSyncLangInApp(langLocalStorage: any, queryLang: any) {
  let initLang = ''
  
  const wasQueryLangFound = !!queryLang;
  const isQueryLangValid = isLanguageAllowed(queryLang)
  
  const wasQueryLangFoundAndValid = wasQueryLangFound && isQueryLangValid;
  const wasQueryLangNotFoundAndInvalid = !wasQueryLangFound && !isQueryLangValid;
  const wasQueryLangFoundAndInvalid = wasQueryLangFound && !isQueryLangValid;
  
  if (wasQueryLangFoundAndValid) {
    initLang = queryLang
    if (langLocalStorage !== queryLang) {
      return setLangInLocalStorageAndState(queryLang).then(() => initLang)
    }
  } else if (wasQueryLangNotFoundAndInvalid || wasQueryLangFoundAndInvalid){
    initLang = DEFAULT_LANG
    if (langLocalStorage !== DEFAULT_LANG) {
      return setLangInLocalStorageAndState(DEFAULT_LANG).then(() => initLang)
    }
  }
  
  return Promise.resolve(initLang)
}

function setLangInLocalStorageAndState(lang: string) {
  return store.dispatch(langActions.CHANGE_LANGUAGE_LOCAL_STORAGE, lang)
    .then(() => store.dispatch(langActions.CHANGE_LANGUAGE_STATE, lang))
  
}

function loadLangFileAsync(lang: string) {
  return loadLanguageAsync(lang).then(() => lang)
}

function syncRedirectIfNeeded(lang: string, to: any, from: any, next: any) {
  const toLang = get(to.query, 'lang', null)
  
  const isMissingQueryLangAndValidLangEqualDefault = !toLang && lang === DEFAULT_LANG
  const isInvalidLang = !isLanguageAllowed(toLang)
  
  if (isMissingQueryLangAndValidLangEqualDefault) {
    next()
  } else if (isInvalidLang) {
    from.query.lang = lang
    to.query.lang = lang
    return next({path: to.fullPath, query: to.query})
  } else {
    return next()
  }
}

export default router
