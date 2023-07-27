const domParser = new DOMParser();

const normalize = (documentFeed) => {
  const channel = documentFeed.querySelector('channel');
  const feedName = channel.querySelector('title').textContent;
  const feedLink = channel.querySelector('link').textContent;
  const item = channel.querySelectorAll('item');
  const collection = Array.from(item);
  const items = [];
  collection.forEach((element) => {
    const post = element.querySelector('title').textContent;
    const link = element.querySelector('link').textContent;
    const date = element.querySelector('pubDate').textContent.slice(5, 16);
    items.push({ post, link, date });
  });
  return { feedName, feedLink, items };
};

export default (feedBody) => {
  const xmlDocument = domParser.parseFromString(feedBody, 'application/xml');
  const rootTag = xmlDocument.documentElement.tagName.toLowerCase();
  console.log(`its a root tage ${rootTag}`);
  if (rootTag !== 'rss') {
    console.log('rss ne rss');
    return Promise.reject(new Error('noRSS'));
  }

  const data = normalize(xmlDocument);
  return Promise.resolve(data);
};
