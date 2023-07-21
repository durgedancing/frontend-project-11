// import fsp from 'fs/promises';
import onChange from 'on-change';
import { setLocale, string } from 'yup';
import getHTML from './getHTML';
import parsMe from './parser';
import renderFeeds from './render';

const renderFeedback = (i118n, state, elements) => {
  const {
    form,
    feedback,
  } = elements;
  form.reset();
  form.focus();
  const feedbackMessage = state.feedback;
  // here i need figure out something with not-typical mistakes
  feedback.textContent = i118n.t(`feedbacks.${feedbackMessage}`);
};

export default (i118n, state, feeds, elements) => {
  const { form } = elements;
  const watcher = onChange(state, (path, value) => {
    setLocale({
      mixed: {
        default: 'default',
        required: 'empty',
        notOneOf: 'alreadyExists',
      },
      string: {
        url: 'invalidUrl',
      },
    });
    const inputShema = string()
      .required()
      .notOneOf(state.subscribed) // i am here its need to be rewritten
      .url();

    switch (path) {
      case 'inputCurrent':
        inputShema.validate(value)
          .then((validUrl) => getHTML(validUrl))
          .then((html) => {
            const data = parsMe(html);
            const { feedname } = data;
            console.log(`this is feed name ${feedname}`);
            watcher.subscribed.push(feedname);
            feeds.push(data);
            watcher.feedback = 'positive';
          })
          .catch((error) => {
            const currentError = error.message;
            console.log(`error is ${currentError}`);
            watcher.feedback = currentError;
            throw new Error(currentError);
          });
        break;
      case 'feedback':
        renderFeedback(i118n, state, elements);
        break;
      case 'subscribed':
        renderFeeds(i118n, feeds, elements);
        break;
      default:
        break;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('boom');
    const formData = new FormData(e.target);
    const value = formData.get('url');
    console.log(`this is input value ${value}`);
    watcher.inputCurrent = value;
  });
  if (state.subscribed.lenght !== 0) {
    renderFeeds(i118n, state, elements);
  }
};
