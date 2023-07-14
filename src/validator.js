// import fsp from 'fs/promises';
import onChange from 'on-change';
import { setLocale, string } from 'yup';
import getHTML from './getHTML';
import parsMe from './parser';

// what if i ll write different render for different situations?
// page with feedback
// enter-page
// const render = (state, elements) => {
// elements.form.focus();
// const { posts, feeds } = elements;
// const { subscribed } = state;
// here I need info aboud feeds and posts to build view
// };

const renderFeedback = (i118n, state, elements) => {
  const {
    form,
    feedback,
  } = elements;
  form.reset();
  form.focus();
  const feedbackMessage = state.feedback;
  console.log(i118n.t(`feedbacks.${feedbackMessage}`));
  feedback.textContent = i118n.t(`feedbacks.${feedbackMessage}`);
};

export default (i118n, state, elements) => {
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
          .then((validFeed) => getHTML(validFeed)) // there is nothing in here
          .then((response) => (response.ok ? response.json() : new Error('networkError')))
          .then((data) => {
            console.log(data.contents);
            console.log(parsMe(data));
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
  // render(i118n, state, elements);
};
// dont forget about focus()
