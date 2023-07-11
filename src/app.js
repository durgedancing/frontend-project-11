import i18n from 'i18next';
import app from './validator.js';
import resources from '../locales/index.js';

const elements = {
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
};

export default () => {
  const state = {
    inputCurrent: '',
    inputDefault: '',
    feedback: '', // current error or success
    subscribed: [],
  };

  i18n
    .createInstance()
    .init({
      lng: 'ru',
      debug: true,
      resources,
    })
    .then((result) => app(result, state, elements));
};
