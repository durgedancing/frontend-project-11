import i18n from 'i18next';
import app from './application.js';
import resources from '../locales/index.js';

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.input'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
};

export default () => {
  const state = {
    inputCurrent: '',
    feedback: '', // current error or success
    subscribed: [],
  };

  const feeds = [];

  const i18In = i18n.createInstance();
  i18In.init({
    lng: 'ru',
    debug: true,
    resources,
  });
  return app(i18In, state, feeds, elements);
};
