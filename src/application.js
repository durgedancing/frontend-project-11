// import fsp from 'fs/promises';
import onChange from 'on-change';
import { setLocale, string } from 'yup';
import getHTML from './getHTML';
import parsMe from './parser';
import renderFeeds from './render';

/* const render = (i118n, state, feeds, elements) => {
  const {
    form,
    feedback,
  } = elements;
  form.reset();
  form.focus();
  const feedbackMessage = state.feedback;
}; */

const renderFeedback = (i118n, state, elements) => {
  const {
    form,
    feedback,
  } = elements;
  form.reset();
  form.focus();
  const feedbackMessage = state.feedback;
  // here i need figure out something with not-typical mistakes
  const feedbackToShow = i118n.t(`feedbacks.${feedbackMessage}`) ? i118n.t(`feedbacks.${feedbackMessage}`) : i118n.t('feedbacks.default');
  console.log(`this is the message i am going to show ${feedbackToShow}`);
  feedback.textContent = feedbackToShow;
};

export default (i118n, state, feedInfo, elements) => {
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
      .notOneOf(state.subscribed)
      .url();

    switch (path) {
      case 'inputCurrent':
        inputShema.validate(value)
          .then((validUrl) => getHTML(validUrl))
          .then((html) => parsMe(html))
          .then((data) => {
            const { feedName } = data;
            feedInfo.push(data);
            watcher.subscribed.push(feedName);
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
        console.log(`this is how mane feeds we have ${feedInfo.length}`);
        renderFeeds(i118n, feedInfo, elements);
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
  if (state.subscribed.length !== 0) {
    console.log('there are some feeds to load');
    renderFeeds(i118n, feedInfo, elements);
  }
};
