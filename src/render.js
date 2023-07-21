import { javascript } from "webpack";

const createElement = (tagName, options = {}) => {
  const { styles, text } = options;
  const element = document.createElement(tagName);
  if (typeof styles === 'string') {
    element.classList.add(styles);
  }
  if (Array.isArray(styles)) {
    element.classList.add(...styles);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

export default (i118n, feedsState, elements) => {
  elements.form.focus();
  const { posts, feeds } = elements;

  const divFeeds = createElement('div', { styles: ['card', 'border-0'] });
  const divHeader = createElement('div', { styles: 'card-body' });
  const header = createElement('h3', { styles: ['card-title', 'h4'], text: i118n.t('feeds') });
  const ulFeeds = createElement('ul', { styles: ['list-group', 'border-0', 'rounded-0'] });

  divHeader.append(header);
  divFeeds.append(divHeader, ulFeeds);
  feeds.append(divFeeds); // may be it should be down

  const divPosts = createElement('div', { style: ['card', 'border-0'] });
  const divPostHeader = createElement('div', { style: 'card-body' });
  const postHeader = createElement('h3', { styles: ['card-title', 'h4'], text: i118n.t('posts') });
  const ulPosts = createElement('ul', { styles: ['list-group', 'border-0', 'rounded-0'] });

  divPostHeader.append(postHeader);
  divPosts.append(divPostHeader, ulPosts);
  posts.append(divPosts);

  console.log(JSON.stringify(feedsState));
  feedsState.forEach((feed) => {
    const { feedName, feedLink, items } = feed;
    // first of all we create feeds in the right colomn
    const liFeed = createElement('li', { styles: ['list-group-item', 'border-0', 'border-end-0'] });
    const aFeed = createElement('a', { styles: ['h6', 'm-0'], text: feedName });
    aFeed.setAttribute('href', feedLink);
    liFeed.append(aFeed);
    ulFeeds.append(liFeed);
    // and then we should create posts in the left
    items.forEach(({ post, link, date }) => {
      const liPost = createElement('li', { styles: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'] });
      const aPost = createElement('a', { style: 'fw-bold', text: post });
      aPost.setAttribute('href', link);
      // aPost.setAttribute('data-id', '27'); // i need my own id
      aPost.setAttribute('target', '_blank');
      aPost.setAttribute('rel', 'noopener noreferrer');

      const dateTeg = createElement('p', { style: 'fw-bold', text: date });

      liPost.append(aPost, dateTeg);
      ulPosts.append(liPost);
    });
  });
};
