import { init, getLocaleFromNavigator, addMessages } from 'svelte-v4-i18n';

import en from './locales/en.json';

addMessages('en', en);

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });