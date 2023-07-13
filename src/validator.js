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
  console.log(`feedback massage ${feedbackMessage}`); // somehow it works twice
  console.log(i118n.t);
  const { feedbacks } = i118n.t;
  console.log(feedbacks);
  console.log(`feedback text: ${i118n.t('feedbacks.feedbackMessage')}`);
  console.log(`feedback text: ${i118n.t('feedbacks[feedbackMessage]')}`);
  feedback.textContent = i118n.t('feedbacks.feedbackMessage');
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
          .catch((error) => {
            const currentError = error.message;
            console.log(`error is ${currentError}`);
            watcher.feedback = currentError;
            return Promise.reject(new Error(currentError));
          })
          .then((validFeed) => getHTML(validFeed))
          // here i need to catch newtworkError
          .catch((error) => {
            const currentError = error.message;
            watcher.feedback = currentError;
            return Promise.reject(new Error(currentError));
          })
          .then((response) => Promise.resolve(response))
          .then((response) => {
            console.log(response);
            console.log(parsMe(response));
          });
        // here i might catch noRSS err and then only render
        // so i need to parse
        // watcher.feedback = 'positive';
        // state.subscribed.push(validFeed);
        // render(i118n, state, elements);
        break;
      case 'feedback':
        console.log(`this is upcomingerror ${value}`);
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
