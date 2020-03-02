import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

import { i18nDateTimeFormats } from '@/i18n/formats/dateTimeFormat.i18n'
import { i18nNumberFormats } from '@/i18n/formats/numberFormat.i18n'
import messagesEN from '@/i18n/locales/en'

const DEFAULT_LANG = process.env.VUE_APP_DEFAULT_LANG;
const DEFAULT_LANGS = process.env.VUE_APP_DEFAULT_LANGS.split(',');

Vue.use(VueI18n)

// @ts-ignore
export const vueI18n = new VueI18n({
  locale: DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: messagesEN,
  formatFallbackMessages: true,
  numberFormats: i18nNumberFormats,
  dateTimeFormats: i18nDateTimeFormats,
})

export function setI18nLanguage(lang: string) {
  vueI18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  // @ts-ignore
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

const loadedLanguages = [DEFAULT_LANG]

export function loadLanguageAsync(lang: string) {
  // If the same language
  if (vueI18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "locales-[request]" */ `@/i18n/locales/${lang}`
  ).then(messages => {
    vueI18n.setLocaleMessage(lang, messages.default[lang])
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  }).catch(err => {
    vueI18n.setLocaleMessage(DEFAULT_LANG, messagesEN)
    return setI18nLanguage(DEFAULT_LANG)
  })
}

export function isLanguageAllowed(lang: string) {
  return DEFAULT_LANGS.includes(lang)
}
