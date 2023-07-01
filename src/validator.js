// import fsp from 'fs/promises';
import onChange from 'on-change';
import { setLocale, string } from 'yup';
import { en, ru } from '../locales/index.js';
// firstly i will write a state about how the input field should look like
// i need to find an input 
// then write watcher for him - watcher will render that field after changes
// should i keep this links and where?

// it is just for an example
// const state = {
//     default: '',
//     current: '',
// };
export default (addreses, state, elements) => {
    const render = (aForm, aState) => {
        aForm.input = aState.default;
        console.log(`this is input text content ${input.textContent}`);
        aForm.focus();
    };
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
        .notOneOf(addreses)
        .url()

        switch (path) {
            case 'current':
                inputShema.validate(value)
                .then((validFeed) => {
                    // do smf with feed
                    // parse and locate etc
                    addreses.push(validFeed);
                    render(state, elements);
                })
                .catch((error) => {
                    // i shuld to get error.massage and put into state
                    // i need rewrite state
                    // and then using watcher render a view with error text
                    // seems like that im gonna usinf two language as well
                    const text = error.message;
                    console.log(`error is ${text}`);
                    watcher.feedback = text;
                })
            case 'feedback':
            render(state, elements);
        }
    });

    form.addEventListener('submit', (event) => {
        e.preventDefault();
        const { value } = input;
        console.log(value);
        watcher.current = value;
    });
};
// dont forget about focus()