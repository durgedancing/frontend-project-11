const domParser = new DOMParser();

const normalize = (documentFeed) => {
  const channel = documentFeed.getElementByTagName('channel');
  const feedName = channel.getElementByTagName('title').textContent;
  const feedLink = feedName.nextElementSibling(feedName).textContent;
  const items = channel.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const post = item.getElementByTagName('title').textContent;
    const link = item.getElementByTagName('link').textContent;
    const date = item.getElementByTagName('pubDate').textContent;
    posts.push({ post, link, date });
  });
  console.log(`this is posts ${posts}`);
  return { feedName, feedLink, posts };
};

export default (feedBody) => {
  const xmlDocument = domParser.parseFromString(feedBody, 'text/xml');
  if (xmlDocument.documentElement.tagName.toLowerCase !== 'rss') {
    return Promise.reject(new Error('noRSS'));
  }
  return normalize(xmlDocument);
};
