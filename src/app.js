import app from 'validator.js';

const stateOfInput = {
    current: '',
    default: '',
}

const feeds = {
    addreses: [],
};

const elements = {
    form: document.querySelector('.form-floating'),
    feedback: document.querySelector('.feedback'),
};

const runApp = async () => {
    const stateOfInput = {
        input: {
            current: '',
            default: '', 
        },
        feedback: '',
    }

    const i18nextInstance = i18n.createInstance();
    await i18nextInstance.init({
      lng: 'en',
      debug: true,
      resources,
    });
    app(i18nextInstance, state, container);
  };

app(feeds.addreses, stateOfInput, elements);